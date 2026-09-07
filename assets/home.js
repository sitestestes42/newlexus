(async()=>{
  const $=id=>document.getElementById(id),S=window.LexusStore;
  const card=p=>{
    const discount=Math.round((1-p.promotionalPriceCents/p.originalPriceCents)*100);
    const img=p.variants?.[0]?.images?.[0]||{};
    return `<article class="produto-card" data-product-id="${p.id}" tabindex="0" aria-label="Ver ${p.shortName}">
      <div class="produto-img"><span class="badge-offer">-${discount}%</span><img src="${img.src||'/assets/brand/product-placeholder.svg'}" alt="${img.alt||p.shortName}" loading="lazy"></div>
      <span class="product-category">${p.category}</span>
      <h3>${p.shortName}</h3>
      <div class="produto-rating"><span class="stars">★★★★★</span><span>Oferta Lexus</span></div>
      <span class="price-old">${S.money(p.originalPriceCents)}</span>
      <strong class="price-new">${S.money(p.promotionalPriceCents)}</strong>
      <span class="parcelas"><i class="fas fa-qrcode"></i> Pagamento via PIX</span>
      <div class="card-swatches" aria-label="Cores disponíveis">${p.variants.slice(0,6).map(v=>`<span class="card-swatch" title="${v.name}" style="background:${v.swatch}"></span>`).join('')}${p.variants.length>6?`<span class="more-colors">+${p.variants.length-6}</span>`:''}</div>
      <div class="card-cta"><span>Ver produto</span><i class="fas fa-arrow-right"></i></div>
    </article>`;
  };
  try{
    const c=await S.getCatalog(),products=c.products||[],hero=products[0];
    if(!hero)throw new Error('Catálogo vazio.');
    const heroImg=hero.variants?.[0]?.images?.[0];
    $('hero-name').textContent=hero.shortName;
    $('hero-description').textContent='Tela AMOLED, câmera de 108 MP e bateria para acompanhar o seu dia.';
    $('hero-old').textContent=S.money(hero.originalPriceCents);
    $('hero-price').textContent=S.money(hero.promotionalPriceCents);
    if(heroImg){$('hero-image').src=heroImg.src;$('hero-image').alt=heroImg.alt||hero.shortName;}
    $('hero-link').href=`/produto?id=${encodeURIComponent(hero.id)}`;
    $('offers').innerHTML=products.slice(0,8).map(card).join('');
    $('featured').innerHTML=products.slice(8,12).map(card).join('');
    document.querySelectorAll('[data-product-id]').forEach(x=>{
      const go=()=>location.href=`/produto?id=${encodeURIComponent(x.dataset.productId)}`;
      x.addEventListener('click',go);
      x.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
    });
    const categories=[
      ['fa-mobile-screen-button','Smartphones','Redmi e Galaxy para o dia a dia'],
      ['fa-headphones','Áudio','Fones e caixas de som'],
      ['fa-tv','Streaming','Entretenimento na sua TV'],
      ['fa-clock','Wearables','Relógios e smartbands']
    ];
    $('spec-features').innerHTML=categories.map(x=>`<article class="feature-card"><i class="fas ${x[0]}"></i><strong>${x[1]}</strong><p>${x[2]}</p></article>`).join('');
  }catch(e){$('offers').innerHTML=`<div class="panel">${e.message}</div>`}
})();
