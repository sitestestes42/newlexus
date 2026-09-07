(() => {
  const CART_KEY='lexus_cart_v4';
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(c||0)/100);
  function readCart(){try{const x=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(x)?x.filter(i=>i&&typeof i.productId==='string'&&typeof i.variant==='string'&&Number.isInteger(i.quantity)&&i.quantity>0):[]}catch{return []}}
  function writeCart(x){localStorage.setItem(CART_KEY,JSON.stringify(x));updateCartCount()}
  function updateCartCount(){const n=readCart().reduce((a,i)=>a+i.quantity,0);document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(n))}
  function add(productId,variant='Padrão',quantity=1,max=5){const cart=readCart();const found=cart.find(i=>i.productId===productId&&i.variant===variant);if(found)found.quantity=Math.min(max,found.quantity+quantity);else cart.push({productId,variant,quantity:Math.max(1,Math.min(max,quantity))});writeCart(cart)}
  function setQty(productId,variant,quantity,max=5){const cart=readCart();const row=cart.find(i=>i.productId===productId&&i.variant===variant);if(row)row.quantity=Math.max(1,Math.min(max,quantity));writeCart(cart)}
  function remove(productId,variant){writeCart(readCart().filter(i=>!(i.productId===productId&&i.variant===variant)))}
  function clear(){writeCart([])}
  async function getCatalog(){const r=await fetch('/api/catalog',{cache:'no-store'});if(!r.ok)throw new Error('Não foi possível carregar o catálogo.');return r.json()}
  function productById(catalog,id){return catalog?.products?.find(p=>p.id===id)||null}
  async function hydrateUser(){try{const r=await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});const d=await r.json();if(d.user){document.querySelectorAll('[data-account-link]').forEach(a=>{a.href='/conta';a.innerHTML='<i class="fas fa-user"></i> <span class="action-label">Minha conta</span>'})}}catch{}}
  function wireSearch(){document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const q=form.querySelector('input')?.value?.trim();location.href=q?`/produtos?busca=${encodeURIComponent(q)}`:'/produtos'}))}
  function toast(msg){let t=document.getElementById('site-toast');if(!t){t=document.createElement('div');t.id='site-toast';t.className='site-toast';document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,2600)}
  window.LexusStore={CART_KEY,money,readCart,writeCart,updateCartCount,add,setQty,remove,clear,getCatalog,productById,toast};
  document.addEventListener('DOMContentLoaded',()=>{updateCartCount();hydrateUser();wireSearch()});
})();
