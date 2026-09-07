(() => {
  const CART_KEY = 'lexus_cart_v2';
  const els = {};
  let catalog = null;
  let selectedVariant = 'Preto';
  let quantity = 1;

  const money = cents => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
  const readCart = () => {
    try {
      const value = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(value) ? value.filter(x => x && x.productId && x.variant && Number.isInteger(x.quantity)) : [];
    } catch { return []; }
  };
  const writeCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const imageFor = variant => catalog?.variants?.find(v => v.name === variant)?.images?.[0]?.src || 'https://i.postimg.cc/26s1r0F3/inow-preta.png';
  const altFor = variant => catalog?.variants?.find(v => v.name === variant)?.images?.[0]?.alt || 'Bicicleta elétrica INOW 1000W';

  function toast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => els.toast.hidden = true, 2600);
  }

  function updateCartUi() {
    const cart = readCart();
    const count = cart.reduce((n, x) => n + x.quantity, 0);
    els.cartCount.textContent = String(count);
    if (!catalog || !cart.length) {
      els.cartContent.innerHTML = '<div class="empty-cart"><strong>Seu carrinho está vazio.</strong><p>Escolha a cor da sua INOW 1000W e adicione ao carrinho.</p></div>';
      els.cartFooter.hidden = true;
      return;
    }
    let total = 0;
    els.cartContent.innerHTML = cart.map(line => {
      const lineTotal = catalog.promotionalPriceCents * line.quantity; total += lineTotal;
      return `<div class="cart-line"><img src="${imageFor(line.variant)}" alt="${altFor(line.variant)}"><div><strong>${catalog.shortName}</strong><span>Cor ${line.variant} · ${line.quantity} un.</span></div><div class="cart-line-actions"><strong>${money(lineTotal)}</strong><button type="button" data-remove="${line.variant}">Remover</button></div></div>`;
    }).join('');
    els.cartTotal.textContent = money(total);
    els.cartFooter.hidden = false;
    els.cartContent.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
      writeCart(readCart().filter(x => x.variant !== btn.dataset.remove));
      updateCartUi();
    }));
  }

  function openCart() {
    updateCartUi();
    els.drawer.classList.add('open');
    els.drawer.setAttribute('aria-hidden','false');
    els.backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    els.drawer.classList.remove('open');
    els.drawer.setAttribute('aria-hidden','true');
    els.backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function renderCatalog() {
    document.getElementById('hero-original').textContent = `De ${money(catalog.originalPriceCents)}`;
    document.getElementById('hero-price').textContent = money(catalog.promotionalPriceCents);
    document.getElementById('purchase-original').textContent = money(catalog.originalPriceCents);
    document.getElementById('purchase-price').textContent = money(catalog.promotionalPriceCents);
    document.getElementById('product-name').textContent = catalog.name;
    document.getElementById('product-description').textContent = catalog.description;
    const variantGrid = document.getElementById('variant-grid');
    variantGrid.innerHTML = catalog.variants.map(v => `<button class="variant-btn${v.name===selectedVariant?' active':''}" type="button" data-variant="${v.name}"><span class="variant-swatch" style="background:${v.swatch}"></span><span>${v.name}</span></button>`).join('');
    variantGrid.querySelectorAll('[data-variant]').forEach(btn => btn.addEventListener('click', () => {
      selectedVariant = btn.dataset.variant;
      document.getElementById('selected-variant').textContent = selectedVariant;
      document.querySelectorAll('.variant-btn').forEach(x => x.classList.toggle('active', x.dataset.variant === selectedVariant));
      document.getElementById('product-image').src = imageFor(selectedVariant);
      document.getElementById('product-image').alt = altFor(selectedVariant);
      document.getElementById('hero-image').src = imageFor(selectedVariant);
      document.getElementById('hero-image').alt = altFor(selectedVariant);
    }));
    document.getElementById('spec-grid').innerHTML = catalog.specifications.map(s => `<article class="spec-card"><span>${s.label}</span><strong>${s.value}</strong></article>`).join('');
    updateCartUi();
  }

  async function loadUser() {
    try {
      const r = await fetch('/api/auth/me',{credentials:'include',cache:'no-store'});
      const data = await r.json();
      if (data.user) {
        const first = (data.user.name || data.user.email || 'Conta').split(/[ @]/)[0];
        document.getElementById('account-link').textContent = first;
        document.getElementById('account-link').href = '/conta';
      }
    } catch {}
  }

  async function init() {
    Object.assign(els, {
      cartCount:document.getElementById('cart-count'),cartContent:document.getElementById('cart-content'),cartFooter:document.getElementById('cart-footer'),cartTotal:document.getElementById('cart-total'),drawer:document.getElementById('cart-drawer'),backdrop:document.getElementById('drawer-backdrop'),toast:document.getElementById('toast')
    });
    document.getElementById('cart-trigger').addEventListener('click', openCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);
    els.backdrop.addEventListener('click', closeCart);
    document.getElementById('qty-minus').addEventListener('click', () => { quantity=Math.max(1,quantity-1); document.getElementById('qty-value').textContent=String(quantity); });
    document.getElementById('qty-plus').addEventListener('click', () => { quantity=Math.min(10,quantity+1); document.getElementById('qty-value').textContent=String(quantity); });

    try {
      const r = await fetch('/api/catalog',{cache:'no-store'});
      if (!r.ok) throw new Error('Catálogo indisponível');
      catalog = await r.json();
      renderCatalog();
    } catch (e) {
      toast('Não foi possível carregar o catálogo. Tente novamente.');
      return;
    }

    const add = (goCheckout=false) => {
      const cart = readCart();
      const existing = cart.find(x => x.productId===catalog.id && x.variant===selectedVariant);
      if (existing) existing.quantity = Math.min(10, existing.quantity + quantity);
      else cart.push({productId:catalog.id,variant:selectedVariant,quantity});
      writeCart(cart);
      updateCartUi();
      if (goCheckout) location.href='/checkout'; else { toast('Produto adicionado ao carrinho.'); openCart(); }
    };
    document.getElementById('add-cart').addEventListener('click', () => add(false));
    document.getElementById('buy-now').addEventListener('click', () => add(true));
    loadUser();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
