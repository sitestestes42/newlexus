const CATEGORY = {
  restaurant: {
    categories: ["catering.restaurant", "catering.fast_food"],
    segment: "restaurant"
  },
  acai: {
    categories: [
      "catering.ice_cream",
      "catering.cafe.ice_cream",
      "commercial.food_and_drink.ice_cream"
    ],
    segment: "acai"
  },
  bakery: {
    categories: [
      "commercial.food_and_drink.bakery",
      "commercial.food_and_drink.confectionery"
    ],
    segment: "bakery"
  },
  beauty: {
    categories: ["service.beauty", "service.beauty.hairdresser"],
    segment: "beauty"
  },
  clothes: {
    categories: ["commercial.clothing"],
    segment: "clothes"
  },
  pet: {
    categories: ["pet.shop", "pet.veterinary", "commercial.pet"],
    segment: "pet"
  },
  cafe: {
    categories: ["catering.cafe"],
    segment: "cafe"
  },
  all: {
    categories: ["commercial", "catering", "service.beauty", "pet"],
    segment: "all"
  }
};

function safeText(value, max = 100) {
  return String(value || "").trim().slice(0, max);
}

async function fetchJson(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        payload?.message ||
        payload?.error ||
        `Geoapify respondeu com erro ${response.status}.`;

      const error = new Error(
        typeof message === "string" ? message : `Erro ${response.status}`
      );
      error.status = response.status;
      throw error;
    }

    return payload;
  } finally {
    clearTimeout(timer);
  }
}

function firstString(value) {
  if (typeof value === "string" && value.trim()) return value.trim();

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = firstString(item);
      if (found) return found;
    }
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      const found = firstString(item);
      if (found) return found;
    }
  }

  return "";
}

function getPhone(properties = {}) {
  return (
    firstString(properties?.contact?.phone) ||
    firstString(properties?.contact?.phone_international) ||
    firstString(properties?.contact?.phone_other)
  );
}

function getWebsite(properties = {}) {
  return (
    firstString(properties.website) ||
    firstString(properties.brand_details?.website) ||
    firstString(properties.operator_details?.website) ||
    firstString(properties.network_details?.website)
  );
}

async function mapWithConcurrency(items, limit, mapper) {
  const result = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;

      try {
        result[index] = await mapper(items[index], index);
      } catch (error) {
        console.warn("Falha em item", index, error?.message || error);
        result[index] = null;
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length || 1) }, worker)
  );

  return result;
}

function validBBox(bbox) {
  return (
    Array.isArray(bbox) &&
    bbox.length === 4 &&
    bbox.every((n) => Number.isFinite(Number(n)))
  );
}

async function searchPlaces({ apiKey, categories, filter, lon, lat, limit = 20 }) {
  const url = new URL("https://api.geoapify.com/v2/places");
  url.searchParams.set("categories", categories.join(","));
  url.searchParams.set("filter", filter);

  if (Number.isFinite(lon) && Number.isFinite(lat)) {
    url.searchParams.set("bias", `proximity:${lon},${lat}`);
  }

  url.searchParams.set("lang", "pt");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("apiKey", apiKey);

  return fetchJson(url, 15000);
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "A variável GEOAPIFY_API_KEY ainda não foi configurada no Vercel."
    });
  }

  const city = safeText(req.query.city, 80);
  const categoryKey = CATEGORY[req.query.category]
    ? req.query.category
    : "restaurant";

  const category = CATEGORY[categoryKey];
  const radiusKmRaw = Number(req.query.radius || 0);
  const radiusKm = [0, 10, 20, 35, 50].includes(radiusKmRaw) ? radiusKmRaw : 20;

  if (!city || city.length < 2) {
    return res.status(400).json({ error: "Informe uma cidade válida." });
  }

  try {
    // 1) Localiza a cidade.
    const geocodeUrl = new URL("https://api.geoapify.com/v1/geocode/search");
    geocodeUrl.searchParams.set("text", `${city}, Brasil`);
    geocodeUrl.searchParams.set("filter", "countrycode:br");
    geocodeUrl.searchParams.set("lang", "pt");
    geocodeUrl.searchParams.set("limit", "1");
    geocodeUrl.searchParams.set("apiKey", apiKey);

    const geo = await fetchJson(geocodeUrl, 12000);
    const cityFeature = geo?.features?.[0];

    if (!cityFeature) {
      return res.status(404).json({
        error: `Não encontrei a cidade “${city}” no Brasil.`
      });
    }

    const cityProps = cityFeature.properties || {};
    const coords = cityFeature?.geometry?.coordinates || [];

    const lon = Number(cityProps.lon ?? coords[0]);
    const lat = Number(cityProps.lat ?? coords[1]);

    if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
      return res.status(502).json({
        error: "Encontrei a cidade, mas não consegui obter suas coordenadas."
      });
    }

    // 2) Busca os estabelecimentos.
    //
    // A versão anterior usava filter=place:<place_id>. Em alguns municípios,
    // esse filtro pode retornar zero mesmo existindo POIs cadastrados.
    // Agora usamos primeiro o bounding box da cidade e, se necessário,
    // fazemos fallback para um raio de 8 km a partir do centro.
    const filters = [];

    if (radiusKm > 0) {
      // Busca regional: inclui municípios e bairros próximos ao ponto informado.
      filters.push(`circle:${lon},${lat},${radiusKm * 1000}`);
    } else {
      // Busca restrita à cidade: usa primeiro os limites administrativos.
      if (validBBox(cityFeature.bbox)) {
        const [minLon, minLat, maxLon, maxLat] = cityFeature.bbox.map(Number);
        filters.push(`rect:${minLon},${minLat},${maxLon},${maxLat}`);
      }

      // Fallback caso a cidade não tenha bbox utilizável.
      filters.push(`circle:${lon},${lat},8000`);
    }

    let placesPayload = null;
    let usedFilter = "";
    let rawFeatures = [];

    for (const filter of filters) {
      placesPayload = await searchPlaces({
        apiKey,
        categories: category.categories,
        filter,
        lon,
        lat,
        limit: categoryKey === "acai" ? 30 : 24
      });

      rawFeatures = placesPayload?.features || [];
      usedFilter = filter;

      if (rawFeatures.length > 0) break;
    }

    let places = rawFeatures
      .map((feature) => ({
        feature,
        props: feature?.properties || {}
      }))
      .filter((item) => item.props.name && item.props.place_id);

    // Açaiterias podem estar cadastradas apenas como sorveteria/café.
    if (categoryKey === "acai") {
      places.sort((a, b) => {
        const aa = /aça[ií]|acai/i.test(a.props.name || "") ? 1 : 0;
        const bb = /aça[ií]|acai/i.test(b.props.name || "") ? 1 : 0;
        return bb - aa;
      });
    }

    // Remove duplicados antes de buscar detalhes.
    const seen = new Set();
    places = places.filter(({ props }) => {
      const key = String(props.place_id || props.name || "").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    places = places.slice(0, 12);

    // 3) Busca telefone e site quando existirem no cadastro.
    const detailed = await mapWithConcurrency(
      places,
      3,
      async ({ props }) => {
        const detailsUrl = new URL(
          "https://api.geoapify.com/v2/place-details"
        );

        detailsUrl.searchParams.set("id", props.place_id);
        detailsUrl.searchParams.set("features", "details");
        detailsUrl.searchParams.set("lang", "pt");
        detailsUrl.searchParams.set("apiKey", apiKey);

        let detailProps = {};

        try {
          const detailsPayload = await fetchJson(detailsUrl, 10000);
          const detailFeature =
            detailsPayload?.features?.find(
              (f) => f?.properties?.feature_type === "details"
            ) || detailsPayload?.features?.[0];

          detailProps = detailFeature?.properties || {};
        } catch (error) {
          console.warn(
            "Falha ao obter detalhes de",
            props.name,
            error?.message || error
          );
        }

        const placeLat = Number(props.lat ?? detailProps.lat) || null;
        const placeLon = Number(props.lon ?? detailProps.lon) || null;

        return {
          id: props.place_id,
          name: props.name || detailProps.name || "",
          address: props.formatted || detailProps.formatted || "",
          phone: getPhone(detailProps) || getPhone(props),
          website: getWebsite(detailProps) || getWebsite(props),
          mapsUrl:
            placeLat && placeLon
              ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(
                  placeLat
                )}&mlon=${encodeURIComponent(
                  placeLon
                )}#map=18/${encodeURIComponent(
                  placeLat
                )}/${encodeURIComponent(placeLon)}`
              : "",
          lat: placeLat,
          lon: placeLon,
          segment: category.segment
        };
      }
    );

    const businesses = detailed.filter(Boolean);

    return res.status(200).json({
      provider: "geoapify",
      city: cityProps.formatted || city,
      count: businesses.length,
      businesses,
      debug: {
        category: category.categories,
        rawPlaces: rawFeatures.length,
        filter: usedFilter,
        radiusKm
      }
    });
  } catch (error) {
    console.error("Geoapify API error:", error);

    const status = Number(error?.status);

    if (status === 401 || status === 403) {
      return res.status(502).json({
        error:
          "A Geoapify recusou a chave da API. Confira a variável GEOAPIFY_API_KEY e as restrições da chave."
      });
    }

    if (status === 429) {
      return res.status(429).json({
        error:
          "O limite de requisições da Geoapify foi atingido. Aguarde um pouco e tente novamente."
      });
    }

    return res.status(502).json({
      error:
        "Não foi possível consultar a Geoapify agora. Tente novamente em alguns segundos."
    });
  }
}
