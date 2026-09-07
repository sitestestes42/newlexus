(() => {
  const CART_KEY='lexus_cart_v2';
  let catalog=null;
  let cart=[];
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);
  const readCart=()=>{try{const a=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(a)?a:[]}catch{return[]}};
  const variantInfo=v=>catalog.variants.find(x=>x.name===v);
  const imageFor=v=>variantInfo(v)?.images?.[0]?.src||'';

  function showMessage(text,type='error'){const el=document.getElementById('checkout-message');el.textContent=text;el.className=`form-message ${type}`;el.hidden=false;}
  function hideMessage(){document.getElementById('checkout-message').hidden=true;}
  function renderSummary(){
    let total=0,count=0;
    document.getElementById('summary-lines').innerHTML=cart.map(line=>{const t=catalog.promotionalPriceCents*line.quantity;total+=t;count+=line.quantity;return `<div class="summary-line"><img src="${imageFor(line.variant)}" alt="${catalog.shortName} ${line.variant}"><div><strong>${catalog.shortName}</strong><span>Cor ${line.variant} · ${line.quantity} un.</span></div><b>${money(t)}</b></div>`}).join('');
    document.getElementById('summary-total').textContent=money(total);document.getElementById('summary-count').textContent=`${count} ${count===1?'item':'itens'}`;
  }
  function normalizePhone(v){return v.replace(/[^0-9()+\-\s]/g,'').slice(0,20)}
  function normalizeCep(v){const d=v.replace(/\D/g,'').slice(0,8);return d.length>5?`${d.slice(0,5)}-${d.slice(5)}`:d}

  async function init(){
    try{
      const [meR,catR]=await Promise.all([fetch('/api/auth/me',{credentials:'include',cache:'no-store'}),fetch('/api/catalog',{cache:'no-store'})]);
      const me=await meR.json();if(!me.user){location.href='/entrar?next=/checkout';return;}
      if(!catR.ok)throw new Error('Catálogo indisponível');catalog=await catR.json();
      cart=readCart().filter(x=>x&&x.productId===catalog.id&&catalog.variants.some(v=>v.name===x.variant)&&Number.isInteger(x.quantity)&&x.quantity>=1&&x.quantity<=10);
      if(!cart.length){location.href='/';return;}
      renderSummary();
      const name=document.getElementById('full-name');if(me.user.name)name.value=me.user.name;
    }catch(e){showMessage('Não foi possível preparar o checkout. Atualize a página.');}
  }

  document.getElementById('phone').addEventListener('input',e=>e.target.value=normalizePhone(e.target.value));
  document.getElementById('cep').addEventListener('input',e=>e.target.value=normalizeCep(e.target.value));
  document.getElementById('state').addEventListener('input',e=>e.target.value=e.target.value.replace(/[^a-zA-Z]/g,'').slice(0,2).toUpperCase());
  document.getElementById('checkout-form').addEventListener('submit',async e=>{
    e.preventDefault();hideMessage();const form=e.currentTarget;if(!form.reportValidity())return;
    if(!document.getElementById('terms').checked){showMessage('Aceite as políticas para continuar.');return;}
    const shipping={fullName:document.getElementById('full-name').value.trim(),phone:document.getElementById('phone').value.trim(),cep:document.getElementById('cep').value.trim(),state:document.getElementById('state').value.trim(),city:document.getElementById('city').value.trim(),neighborhood:document.getElementById('neighborhood').value.trim(),street:document.getElementById('street').value.trim(),number:document.getElementById('number').value.trim(),complement:document.getElementById('complement').value.trim()};
    const fingerprint=cart.map(x=>`${x.productId}:${x.variant}:${x.quantity}`).sort().join('|');
    const storageKey=`lexus_order_key:${fingerprint}`;let idempotencyKey=sessionStorage.getItem(storageKey);if(!idempotencyKey){idempotencyKey=crypto.randomUUID();sessionStorage.setItem(storageKey,idempotencyKey);}
    const btn=document.getElementById('submit-order');const old=btn.innerHTML;btn.disabled=true;btn.textContent='Validando pedido...';
    try{
      const r=await fetch('/api/orders/create',{method:'POST',headers:{'content-type':'application/json'},credentials:'include',body:JSON.stringify({idempotencyKey,lines:cart.map(({productId,variant,quantity})=>({productId,variant,quantity})),shipping,acceptTerms:true})});
      const data=await r.json().catch(()=>({}));if(r.status===401){location.href='/entrar?next=/checkout';return;}if(!r.ok)throw new Error(data.error||'Não foi possível criar o pedido.');
      localStorage.removeItem(CART_KEY);sessionStorage.removeItem(storageKey);form.hidden=true;document.getElementById('created-order-id').textContent=data.orderId;document.getElementById('created-copy').textContent=`Pedido no valor de ${money(data.total)} criado com status ${data.status}.`;document.getElementById('order-created').hidden=false;window.scrollTo({top:0,behavior:'smooth'});
    }catch(err){showMessage(err.message||'Não foi possível criar o pedido.');}
    finally{btn.disabled=false;btn.innerHTML=old;}
  });
  document.addEventListener('DOMContentLoaded',init);
})();
