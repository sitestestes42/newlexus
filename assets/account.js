(() => {
  const money=c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100);
  const statusLabel=s=>({pending:'Pendente',paid:'Pago',failed:'Falhou',cancelled:'Cancelado'})[s]||s;
  async function init(){
    try{
      const meR=await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});const me=await meR.json();if(!me.user){location.href='/entrar?next=/conta';return;}
      const name=me.user.name||me.user.email?.split('@')[0]||'Cliente';document.getElementById('profile-name').textContent=name;document.getElementById('profile-email').textContent=me.user.email||'';document.getElementById('profile-avatar').textContent=name.trim().charAt(0).toUpperCase()||'L';
      const r=await fetch('/api/orders/list',{credentials:'include',cache:'no-store'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Não foi possível carregar pedidos.');
      const list=document.getElementById('orders-list');if(!data.orders?.length){list.innerHTML='<div class="empty-orders">Você ainda não possui pedidos.</div>';return;}
      list.innerHTML=data.orders.map(o=>`<article class="order-row"><div><strong>Pedido ${o.id}</strong><span>${new Date(o.createdAt).toLocaleString('pt-BR')} · ${o.itemsSummary||'INOW 1000W'}</span></div><div class="order-row-right"><strong>${money(o.totalCents)}</strong><span class="status-pill">${statusLabel(o.status)}</span></div></article>`).join('');
    }catch(e){document.getElementById('orders-list').innerHTML=`<div class="form-message error">${e.message||'Erro ao carregar a conta.'}</div>`;}
  }
  document.getElementById('logout-button').addEventListener('click',async()=>{await fetch('/api/auth/logout',{method:'POST',credentials:'include'}).catch(()=>{});location.href='/';});
  document.addEventListener('DOMContentLoaded',init);
})();
