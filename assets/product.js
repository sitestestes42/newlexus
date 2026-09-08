(async()=>{
  const S=window.LexusStore,root=document.getElementById('produto-detalhe');
  try{
    const c=await S.getCatalog();
    const id=new URLSearchParams(location.search).get('id')||c.products?.[0]?.id;
    const p=S.productById(c,id);
    if(!p)throw new Error('Produto não encontrado.');
    document.title=`${p.shortName} | Lexus Elétricos`;
    S.metaTrack?.('ViewContent',{
      content_ids:[p.id],
      content_name:p.name,
      content_category:p.category,
      content_type:'product',
      value:Number(p.promotionalPriceCents||0)/100,
      currency:'BRL'
    });
    let selectedVariant=p.variants[0];

    const galleryHtml=variant=>{
      const images=variant.images||[];
      return `<div class="galeria-principal"><img id="main-image" src="${images[0]?.src||''}" alt="${images[0]?.alt||p.shortName}" style="object-fit:${images[0]?.fit||'contain'};object-position:${images[0]?.position||'center center'};background:${images[0]?.background||'transparent'};transform:scale(${images[0]?.scale||1})"></div><div class="galeria-miniaturas" id="thumbs">${images.map((x,i)=>`<button type="button" class="${i===0?'active':''}" data-src="${x.src}" data-alt="${x.alt||p.shortName}" data-fit="${x.fit||'contain'}" data-position="${x.position||'center center'}" data-background="${x.background||'transparent'}" data-scale="${x.scale||1}"><img src="${x.src}" alt="${x.alt||p.shortName}" style="object-fit:contain;object-position:${x.position||'center center'};background:transparent;transform:scale(${x.scale||1})"></button>`).join('')}</div>`;
    };

    root.innerHTML=`<div class="produto-detalhe-grid"><div class="produto-galeria" id="product-gallery">${galleryHtml(selectedVariant)}</div><div class="produto-info"><span class="product-category">${p.category}</span><h1>${p.name}</h1><div class="produto-rating"><span class="stars">★★★★★</span><span>Oferta Lexus</span></div><div class="produto-preco-box"><span class="price-old">${S.money(p.originalPriceCents)}</span><span class="price-new">${S.money(p.promotionalPriceCents)}</span><span class="price-installments"><i class="fas fa-qrcode"></i> Pagamento somente via PIX</span></div><div class="produto-estoque"><span class="in-stock"><i class="fas fa-check-circle"></i> Disponível para pedido</span></div><div class="produto-actions"><div class="selectors-row"><div class="field-inline color-field"><label>Cor</label><div class="variant-buttons" id="variant-buttons">${p.variants.map((v,i)=>`<button class="variant-choice ${i===0?'active':''}" type="button" data-variant="${v.name}"><span class="variant-dot" style="background:${v.swatch}"></span><span>${v.name}</span></button>`).join('')}</div></div><div class="field-inline"><label for="quantidade">Quantidade</label><select id="quantidade">${Array.from({length:Math.min(p.maxQuantity,5)},(_,i)=>i+1).map(n=>`<option value="${n}">${n}</option>`).join('')}</select></div></div><div class="selected-color-copy">Cor selecionada: <strong id="selected-color-name">${selectedVariant.name}</strong></div><div class="produto-buttons"><button class="btn-cart" id="btn-add-cart"><i class="fas fa-cart-plus"></i> Adicionar ao carrinho</button><button class="btn-buy" id="btn-comprar-agora"><i class="fas fa-bolt"></i> Comprar agora</button></div></div><div class="produto-descricao"><h3><i class="fas fa-circle-info"></i> Descrição</h3><p>${p.description}</p></div><div class="produto-especificacoes"><h3><i class="fas fa-list"></i> Especificações</h3><table>${p.specifications.map(s=>`<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('')}</table></div></div></div>`;

    function wireGallery(){
      const img=document.getElementById('main-image');
      document.querySelectorAll('#thumbs button').forEach(b=>b.onclick=()=>{
        img.src=b.dataset.src;img.alt=b.dataset.alt;img.style.objectFit=b.dataset.fit||'contain';img.style.objectPosition=b.dataset.position||'center center';img.style.background=b.dataset.background||'transparent';img.style.transform=`scale(${b.dataset.scale||1})`;
        document.querySelectorAll('#thumbs button').forEach(x=>x.classList.toggle('active',x===b));
      });
    }
    wireGallery();

    document.querySelectorAll('#variant-buttons [data-variant]').forEach(btn=>btn.onclick=()=>{
      const next=p.variants.find(v=>v.name===btn.dataset.variant);if(!next)return;
      selectedVariant=next;
      document.querySelectorAll('#variant-buttons [data-variant]').forEach(x=>x.classList.toggle('active',x===btn));
      document.getElementById('selected-color-name').textContent=selectedVariant.name;
      document.getElementById('product-gallery').innerHTML=galleryHtml(selectedVariant);
      wireGallery();
    });

    const qty=()=>Number(document.getElementById('quantidade').value)||1;
    document.getElementById('btn-add-cart').onclick=()=>{const q=qty();S.add(p.id,selectedVariant.name,q,p.maxQuantity);S.metaTrack?.('AddToCart',{content_ids:[p.id],content_name:p.name,content_category:p.category,content_type:'product',contents:[{id:p.id,quantity:q}],value:(Number(p.promotionalPriceCents||0)*q)/100,currency:'BRL'});S.toast(`${selectedVariant.name} adicionado ao carrinho.`)};
    document.getElementById('btn-comprar-agora').onclick=()=>{const q=qty();S.add(p.id,selectedVariant.name,q,p.maxQuantity);S.metaTrack?.('AddToCart',{content_ids:[p.id],content_name:p.name,content_category:p.category,content_type:'product',contents:[{id:p.id,quantity:q}],value:(Number(p.promotionalPriceCents||0)*q)/100,currency:'BRL'});location.href='/carrinho'};
  }catch(e){root.innerHTML=`<div class="panel">${e.message}</div>`}
})();
