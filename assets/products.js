(async()=>{
  const S=window.LexusStore,grid=document.getElementById('products-grid'),filter=document.getElementById('category-filter');
  try{
    const c=await S.getCatalog();let products=c.products||[];
    const q=new URLSearchParams(location.search).get('busca')?.trim().toLowerCase()||'';
    if(q)products=products.filter(p=>`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q));
    const categories=['Todos',...(c.categories||[])];
    filter.innerHTML=categories.map(x=>`<button type="button" data-category="${x}" class="${x==='Todos'?'active':''}">${x}</button>`).join('');
    const render=cat=>{
      const rows=products.filter(p=>cat==='Todos'||p.category===cat);
      grid.innerHTML=rows.length?rows.map(p=>{
        const d=Math.round((1-p.promotionalPriceCents/p.originalPriceCents)*100),img=p.variants?.[0]?.images?.[0]||{};
        return `<article class="produto-card" data-product-id="${p.id}" tabindex="0">
          <div class="produto-img"><span class="badge-offer">-${d}%</span><img src="${img.src||'/assets/brand/product-placeholder.svg'}" alt="${img.alt||p.shortName}" loading="lazy"></div>
          <span class="product-category">${p.category}</span><h3>${p.shortName}</h3><p class="product-mini-desc">${p.description}</p>
          <span class="price-old">${S.money(p.originalPriceCents)}</span><strong class="price-new">${S.money(p.promotionalPriceCents)}</strong>
          <span class="parcelas"><i class="fas fa-qrcode"></i> Pagamento via PIX</span>
          <div class="card-swatches">${p.variants.slice(0,6).map(v=>`<span class="card-swatch" title="${v.name}" style="background:${v.swatch}"></span>`).join('')}</div>
          <div class="card-cta"><span>Ver detalhes</span><i class="fas fa-arrow-right"></i></div>
        </article>`;
      }).join(''):`<div class="empty-state"><h2>Nenhum produto encontrado</h2><p>Tente outra busca ou categoria.</p></div>`;
      grid.querySelectorAll('[data-product-id]').forEach(x=>{
        const go=()=>location.href=`/produto?id=${encodeURIComponent(x.dataset.productId)}`;
        x.onclick=go;x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};
      });
    };
    filter.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{filter.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render(b.dataset.category)});
    render('Todos');
  }catch(e){grid.innerHTML=`<div class="panel">${e.message}</div>`}
})();
