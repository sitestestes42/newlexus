(async()=>{
  const $=id=>document.getElementById(id);const S=window.LexusStore;
  try{
    const p=await S.getCatalog();
    $('hero-name').textContent=p.shortName;$('hero-description').textContent=p.description;$('hero-old').textContent=S.money(p.originalPriceCents);$('hero-price').textContent=S.money(p.promotionalPriceCents);$('hero-image').src=p.variants[0].images[0].src;$('hero-image').alt=p.variants[0].images[0].alt;
    const discount=Math.round((1-p.promotionalPriceCents/p.originalPriceCents)*100);
    $('offers').innerHTML=p.variants.map(v=>`<article class="produto-card" data-product-link="${v.name}"><div class="produto-img"><span class="badge-offer">-${discount}%</span><img src="${v.images[0].src}" alt="${v.images[0].alt}"></div><h3>${p.shortName} — ${v.name}</h3><div class="produto-rating"><span class="stars">★★★★★</span><span>Mobilidade urbana</span></div><span class="price-old">${S.money(p.originalPriceCents)}</span><strong class="price-new">${S.money(p.promotionalPriceCents)}</strong><span class="parcelas">Preço validado no servidor</span><span class="variant-label"><span class="variant-dot" style="background:${v.swatch}"></span>Cor ${v.name}</span></article>`).join('');
    document.querySelectorAll('[data-product-link]').forEach(card=>card.addEventListener('click',()=>location.href=`/produto?cor=${encodeURIComponent(card.dataset.productLink)}`));
    $('featured').innerHTML=`<article class="produto-card" data-featured-product><div class="produto-img"><img src="${p.variants[0].images[0].src}" alt="${p.variants[0].images[0].alt}"></div><h3>${p.name}</h3><div class="produto-rating"><span class="stars">★★★★★</span><span>1000 W · até 45 km/h</span></div><span class="price-old">${S.money(p.originalPriceCents)}</span><strong class="price-new">${S.money(p.promotionalPriceCents)}</strong><span class="parcelas">Preto e Caramelo</span></article>`;
    document.querySelector('[data-featured-product]').addEventListener('click',()=>location.href='/produto');
    $('spec-features').innerHTML=p.specifications.slice(0,4).map((x,i)=>`<article class="feature-card"><i class="fas ${['fa-bolt','fa-gauge-high','fa-battery-full','fa-bicycle'][i]||'fa-check'}"></i><strong>${x.value}</strong><p>${x.label}</p></article>`).join('');
  }catch(e){$('offers').innerHTML=`<div class="panel">${e.message}</div>`}
})();
