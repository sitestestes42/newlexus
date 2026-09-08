export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    ok: true,
    provider: "geoapify",
    configured: Boolean(process.env.GEOAPIFY_API_KEY)
  });
};
