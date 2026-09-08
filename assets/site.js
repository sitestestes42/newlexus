(() => {
  const CART_KEY='lexus_cart_v4';
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(c||0)/100);
  const escapeXml=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  const svgData=svg=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  function buildGalleryVariants(product){
    const base=((product?.variants?.[0]?.images)||[]).find(img=>img && img.src);
    if(!base) return [];
    const title=(product.shortName||product.name||'Produto Lexus');
    return [
      {src:String(base.src),alt:base.alt||title,position:'center center',fit:'contain',background:'transparent',scale:1},
      {src:String(base.src),alt:`${title} - detalhe frontal`,position:'center center',fit:'contain',background:'transparent',scale:1.12},
      {src:String(base.src),alt:`${title} - detalhe ampliado`,position:'center center',fit:'contain',background:'transparent',scale:1.23}
    ];
  }

  function ensureGallery(product){
    const base=((product?.variants?.[0]?.images)||[])
      .filter(img=>img && img.src)
      .map(img=>({
        src:String(img.src),
        alt:img.alt||product.shortName||product.name||'Produto Lexus',
        position:img.position||'center center',
        fit:img.fit||'contain',
        background:img.background||'transparent',
        scale:Number(img.scale||1)
      }));

    const variants=base.length>=3 ? base.slice(0,3) : buildGalleryVariants(product);
    while(variants.length<3 && variants[0]) variants.push({...variants[0]});
    return variants.slice(0,3);
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


  function installImageFallback(){
    document.addEventListener('error',event=>{
      const img=event.target;
      if(!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied==='1') return;
      if(img.closest('.brand-logo,.footer-brand')) return;
      img.dataset.fallbackApplied='1';
      img.src='/assets/brand/product-placeholder.svg';
      img.classList.add('product-image-fallback');
    },true);
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
  function metaTrack(event,params={}){
    try{if(typeof window.fbq==='function')window.fbq('track',event,params)}catch{}
  }
  function metaTrackCustom(event,params={}){
    try{if(typeof window.fbq==='function')window.fbq('trackCustom',event,params)}catch{}
  }
  function toast(msg){let t=document.getElementById('site-toast');if(!t){t=document.createElement('div');t.id='site-toast';t.className='site-toast';document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,2600)}
  window.LexusStore={CART_KEY,money,readCart,writeCart,updateCartCount,add,setQty,remove,clear,getCatalog,productById,toast,metaTrack,metaTrackCustom};
  installImageFallback();
  document.addEventListener('DOMContentLoaded',()=>{updateCartCount();hydrateUser();wireSearch()});
})();
