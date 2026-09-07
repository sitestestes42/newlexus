(() => {
  const CART_KEY='lexus_cart_v4';
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(c||0)/100);
  const escapeXml=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  const svgData=svg=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  function buildGalleryCards(product){
    const name=escapeXml(product.shortName||product.name||'Produto Lexus');
    const category=escapeXml(product.category||'Tecnologia');
    const price=escapeXml(money(product.promotionalPriceCents));
    const old=escapeXml(money(product.originalPriceCents));
    const specs=(product.specifications||[]).slice(0,3).map(s=>`${s.label}: ${s.value}`);
    const specLines=specs.map((line,i)=>`<text x="80" y="${418+i*76}" font-family="Inter,Arial,sans-serif" font-size="36" fill="#d9ded2">• ${escapeXml(line)}</text>`).join('');

    const specCard = svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#171b17"/>
            <stop offset="100%" stop-color="#232922"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" rx="48" fill="url(#g)"/>
        <rect x="80" y="80" width="280" height="64" rx="32" fill="#b7d63e"/>
        <text x="120" y="122" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="800" fill="#171914">Ficha rápida</text>
        <text x="80" y="240" font-family="Inter,Arial,sans-serif" font-size="72" font-weight="900" fill="#ffffff">${name}</text>
        <text x="80" y="310" font-family="Inter,Arial,sans-serif" font-size="34" fill="#b8c1b2">${category}</text>
        <line x1="80" y1="360" x2="1120" y2="360" stroke="#313831" stroke-width="2"/>
        ${specLines}
        <text x="80" y="980" font-family="Inter,Arial,sans-serif" font-size="32" fill="#8f978c" text-decoration="line-through">${old}</text>
        <text x="80" y="1060" font-family="Inter,Arial,sans-serif" font-size="84" font-weight="900" fill="#ffffff">${price}</text>
        <text x="80" y="1120" font-family="Inter,Arial,sans-serif" font-size="28" fill="#b7d63e">Oferta Lexus • pagamento via PIX</text>
      </svg>
    `);

    const offerCard = svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
        <rect width="1200" height="1200" rx="48" fill="#f4f7ec"/>
        <rect x="72" y="72" width="1056" height="1056" rx="40" fill="#ffffff" stroke="#e3e9d5" stroke-width="4"/>
        <rect x="120" y="120" width="280" height="64" rx="32" fill="#eef5da"/>
        <text x="160" y="162" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="800" fill="#5e6f1d">Somente PIX</text>
        <text x="120" y="278" font-family="Inter,Arial,sans-serif" font-size="70" font-weight="900" fill="#171914">${name}</text>
        <text x="120" y="344" font-family="Inter,Arial,sans-serif" font-size="34" fill="#6f776d">Compra segura com checkout Lexus</text>
        <rect x="120" y="430" width="960" height="230" rx="28" fill="#171914"/>
        <text x="168" y="514" font-family="Inter,Arial,sans-serif" font-size="32" fill="#b7d63e">de ${old}</text>
        <text x="168" y="610" font-family="Inter,Arial,sans-serif" font-size="90" font-weight="900" fill="#ffffff">${price}</text>
        <text x="168" y="770" font-family="Inter,Arial,sans-serif" font-size="32" font-weight="800" fill="#171914">Destaques</text>
        <text x="168" y="834" font-family="Inter,Arial,sans-serif" font-size="30" fill="#5f665d">• pagamento instantâneo por QR Code</text>
        <text x="168" y="888" font-family="Inter,Arial,sans-serif" font-size="30" fill="#5f665d">• cópia e cola do PIX</text>
        <text x="168" y="942" font-family="Inter,Arial,sans-serif" font-size="30" fill="#5f665d">• pedido confirmado no backend</text>
        <rect x="120" y="1000" width="360" height="68" rx="34" fill="#b7d63e"/>
        <text x="174" y="1044" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="900" fill="#171914">Lexus Elétricos</text>
      </svg>
    `);

    return [
      {src: specCard, alt: `Ficha técnica de ${product.shortName||product.name}`},
      {src: offerCard, alt: `Oferta e pagamento de ${product.shortName||product.name}`},
    ];
  }

  function ensureGallery(product){
    const base=((product?.variants?.[0]?.images)||[])
      .filter(img=>img && img.src)
      .map(img=>({src:String(img.src),alt:img.alt||product.shortName||product.name||'Produto Lexus'}));

    const seen=new Set();
    const unique=[];
    for(const img of base){
      if(!seen.has(img.src)){ seen.add(img.src); unique.push(img); }
    }
    for(const img of buildGalleryCards(product)){
      if(unique.length>=3) break;
      if(!seen.has(img.src)){ seen.add(img.src); unique.push(img); }
    }
    while(unique.length<3 && unique[0]) unique.push({...unique[0], alt: `${unique[0].alt} ${unique.length+1}`});
    return unique;
  }

  function decorateCatalog(catalog){
    if(!catalog || !Array.isArray(catalog.products)) return catalog;
    const copy=(typeof structuredClone==='function') ? structuredClone(catalog) : JSON.parse(JSON.stringify(catalog));
    copy.products=(copy.products||[]).map(product=>{
      if(Array.isArray(product.variants)){
        product.variants=product.variants.map(variant=>({
          ...variant,
          images: ensureGallery({...product, variants:[variant]})
        }));
      }
      return product;
    });
    return copy;
  }

  function readCart(){try{const x=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(x)?x.filter(i=>i&&typeof i.productId==='string'&&typeof i.variant==='string'&&Number.isInteger(i.quantity)&&i.quantity>0):[]}catch{return []}}
  function writeCart(x){localStorage.setItem(CART_KEY,JSON.stringify(x));updateCartCount()}
  function updateCartCount(){const n=readCart().reduce((a,i)=>a+i.quantity,0);document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(n))}
  function add(productId,variant='Padrão',quantity=1,max=5){const cart=readCart();const found=cart.find(i=>i.productId===productId&&i.variant===variant);if(found)found.quantity=Math.min(max,found.quantity+quantity);else cart.push({productId,variant,quantity:Math.max(1,Math.min(max,quantity))});writeCart(cart)}
  function setQty(productId,variant,quantity,max=5){const cart=readCart();const row=cart.find(i=>i.productId===productId&&i.variant===variant);if(row)row.quantity=Math.max(1,Math.min(max,quantity));writeCart(cart)}
  function remove(productId,variant){writeCart(readCart().filter(i=>!(i.productId===productId&&i.variant===variant)))}
  function clear(){writeCart([])}
  async function getCatalog(){const r=await fetch('/api/catalog',{cache:'no-store'});if(!r.ok)throw new Error('Não foi possível carregar o catálogo.');return decorateCatalog(await r.json())}
  function productById(catalog,id){return catalog?.products?.find(p=>p.id===id)||null}
  async function hydrateUser(){try{const r=await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});const d=await r.json();if(d.user){document.querySelectorAll('[data-account-link]').forEach(a=>{a.href='/conta';a.innerHTML='<i class="fas fa-user"></i> <span class="action-label">Minha conta</span>'})}}catch{}}
  function wireSearch(){document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const q=form.querySelector('input')?.value?.trim();location.href=q?`/produtos?busca=${encodeURIComponent(q)}`:'/produtos'}))}
  function toast(msg){let t=document.getElementById('site-toast');if(!t){t=document.createElement('div');t.id='site-toast';t.className='site-toast';document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,2600)}
  window.LexusStore={CART_KEY,money,readCart,writeCart,updateCartCount,add,setQty,remove,clear,getCatalog,productById,toast};
  document.addEventListener('DOMContentLoaded',()=>{updateCartCount();hydrateUser();wireSearch()});
})();
