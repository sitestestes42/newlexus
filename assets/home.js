(async()=>{
  const $=id=>document.getElementById(id),S=window.LexusStore;
  const card=p=>{const discount=Math.round((1-p.promotionalPriceCents/p.originalPriceCents)*100),img=p.variants[0].images[0];return `<article class="produto-card" data-product-id="${p.id}"><div class="produto-img"><span class="badge-offer">-${discount}%</span><img src="${img.src}" alt="${img.alt}" loading="lazy"></div><span class="product-category">${p.category}</span><h3>${p.shortName}</h3><div class="produto-rating"><span class="stars">★★★★★</span><span>Oferta Lexus</span></div><span class="price-old">${S.money(p.originalPriceCents)}</span><strong class="price-new">${S.money(p.promotionalPriceCents)}</strong><span class="parcelas"><i class="fas fa-qrcode"></i> Pagamento somente via PIX</span></article>`};
  try{
    const c=await S.getCatalog(),products=c.products||[],hero=products[0];if(!hero)throw new Error('Catálogo vazio.');
    const heroImg=hero.variants?.[0]?.images?.[0];
    $('hero-name').textContent=hero.shortName;
    $('hero-description').textContent=(hero.description||'').slice(0,145)+(hero.description&&hero.description.length>145?'...':'');
    $('hero-old').textContent=S.money(hero.originalPriceCents);
    $('hero-price').textContent=S.money(hero.promotionalPriceCents);
    if(heroImg){$('hero-image').src=heroImg.src;$('hero-image').alt=heroImg.alt||hero.shortName;}
    $('hero-link').href=`/produto?id=${encodeURIComponent(hero.id)}`;
    $('offers').innerHTML=products.slice(0,8).map(card).join('');$('featured').innerHTML=products.slice(8,12).map(card).join('');
    document.querySelectorAll('[data-product-id]').forEach(x=>x.addEventListener('click',()=>location.href=`/produto?id=${encodeURIComponent(x.dataset.productId)}`));
    const categories=[['fa-mobile-screen-button','Smartphones','Celulares para o dia a dia'],['fa-headphones','Áudio','Fones e caixas de som'],['fa-tv','Streaming','Conteúdo na sua TV'],['fa-clock','Wearables','Relógios e smartbands'],['fa-battery-full','Acessórios','Energia e carregamento']];
    $('spec-features').innerHTML=categories.slice(0,4).map(x=>`<article class="feature-card"><i class="fas ${x[0]}"></i><strong>${x[1]}</strong><p>${x[2]}</p></article>`).join('');
  }catch(e){$('offers').innerHTML=`<div class="panel">${e.message}</div>`}
})();
