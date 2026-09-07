(() => {
  const CART_KEY='lexus_cart_v3';
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(c||0)/100);
  function readCart(){try{const x=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(x)?x.filter(i=>i&&i.productId&&i.variant&&Number.isInteger(i.quantity)):[]}catch{return []}}
  function writeCart(x){localStorage.setItem(CART_KEY,JSON.stringify(x));updateCartCount()}
  function updateCartCount(){const n=readCart().reduce((a,i)=>a+i.quantity,0);document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(n))}
  function add(productId,variant,quantity){const cart=readCart();const found=cart.find(i=>i.productId===productId&&i.variant===variant);if(found)found.quantity=Math.min(10,found.quantity+quantity);else cart.push({productId,variant,quantity});writeCart(cart)}
  function setQty(variant,quantity){const cart=readCart();const row=cart.find(i=>i.variant===variant);if(row)row.quantity=Math.max(1,Math.min(10,quantity));writeCart(cart)}
  function remove(variant){writeCart(readCart().filter(i=>i.variant!==variant))}
  function clear(){writeCart([])}
  async function getCatalog(){const r=await fetch('/api/catalog',{cache:'no-store'});if(!r.ok)throw new Error('Não foi possível carregar o catálogo.');return r.json()}
  async function hydrateUser(){try{const r=await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});const d=await r.json();if(d.user){document.querySelectorAll('[data-account-link]').forEach(a=>{a.href='/conta';a.innerHTML='<i class="fas fa-user"></i> <span class="action-label">Minha conta</span>'})}}catch{}}
  function wireSearch(){document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const q=form.querySelector('input')?.value?.trim();location.href=q?`/produto?busca=${encodeURIComponent(q)}`:'/produto'}))}
  function toast(msg){let t=document.getElementById('site-toast');if(!t){t=document.createElement('div');t.id='site-toast';t.className='site-toast';document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,2400)}
  window.LexusStore={CART_KEY,money,readCart,writeCart,updateCartCount,add,setQty,remove,clear,getCatalog,toast};
  document.addEventListener('DOMContentLoaded',()=>{updateCartCount();hydrateUser();wireSearch()});
})();
