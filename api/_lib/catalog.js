export const STORE_NAME='Lexus Elétricos';
export const PIX_MAX_CENTS=99999;
export const CART_MAX_LINES=20;

export const PRODUCTS=[
  {
    id:'redmi-note-13-128gb',slug:'redmi-note-13-128gb',name:'Xiaomi Redmi Note 13 128GB',shortName:'Redmi Note 13 128GB',category:'Smartphones',
    description:'Smartphone com tela AMOLED de 6,67 polegadas e 120 Hz, câmera principal de 108 MP, processador Snapdragon 685, bateria de 5.000 mAh e carregamento rápido de 33 W. Esta oferta é para a versão com 128 GB de armazenamento.',
    originalPriceCents:110000,promotionalPriceCents:99000,maxQuantity:1,
    variants:[{name:'Preto Meia-noite',swatch:'#181818',images:[{src:'/assets/product-gallery/normalized/redmi-note-13-1.png',alt:'Redmi Note 13 Preto Meia-noite',position:'center center',fit:'contain',background:'#fafbf9'},{src:'/assets/product-gallery/normalized/redmi-note-13-2.png',alt:'Redmi Note 13 detalhe',position:'center center',fit:'cover',background:'#f4f6f1'},{src:'https://i02.appmifile.com/mi-com-product/fly-birds/redmi-note-13/PC/bac9e4d29124ae838486e7f567d14361.jpg',alt:'Xiaomi Redmi Note 13',position:'center center',fit:'contain',background:'#fafbf9'}]},{name:'Verde Menta',swatch:'#b8d7b8',images:[{src:'/assets/product-gallery/normalized/redmi-note-13-1.png',alt:'Redmi Note 13 Verde Menta',position:'center center',fit:'contain',background:'#f6faf6'}]},{name:'Azul Gelo',swatch:'#a9d4e6',images:[{src:'/assets/product-gallery/normalized/redmi-note-13-2.png',alt:'Redmi Note 13 Azul Gelo',position:'center center',fit:'contain',background:'#f4f8fa'}]}],
    specifications:[{label:'Armazenamento',value:'128 GB'},{label:'Tela',value:'AMOLED 6,67” · 120 Hz'},{label:'Câmera principal',value:'108 MP'},{label:'Processador',value:'Snapdragon 685'},{label:'Bateria',value:'5.000 mAh · 33 W'}]
  },
  {
    id:'fire-tv-stick-full-hd',slug:'fire-tv-stick-full-hd',name:'Amazon Fire TV Stick Full HD',shortName:'Fire TV Stick Full HD',category:'Streaming',
    description:'Dispositivo de streaming compacto para transformar uma TV com HDMI em uma central de entretenimento Full HD. Acompanha controle remoto por voz com Alexa e acesso a aplicativos de streaming compatíveis.',
    originalPriceCents:29000,promotionalPriceCents:24000,maxQuantity:4,
    variants:[{name:'Preto',swatch:'#242424',images:[{src:'/assets/product-gallery/normalized/fire-tv-stick-1.png',alt:'Amazon Fire TV Stick Full HD preto',position:'center center',fit:'contain',background:'#fafbf9'},{src:'/assets/product-gallery/normalized/fire-tv-stick-2.png',alt:'Amazon Fire TV Stick Full HD produto',position:'center center',fit:'contain',background:'#fafbf9'},{src:'/assets/product-gallery/normalized/fire-tv-stick-3.png',alt:'Amazon Fire TV Stick Full HD conjunto',position:'center center',fit:'contain',background:'#fafbf9'}]}],
    specifications:[{label:'Resolução',value:'Até Full HD 1080p'},{label:'Conexão',value:'HDMI'},{label:'Controle',value:'Controle por voz com Alexa'},{label:'Rede',value:'Wi‑Fi'},{label:'Uso',value:'Apps e serviços de streaming compatíveis'}]
  },
  {
    id:'echo-dot-5',slug:'echo-dot-5',name:'Amazon Echo Dot 5ª Geração',shortName:'Echo Dot 5ª Geração',category:'Casa Inteligente',
    description:'Caixa de som inteligente com Alexa para músicas, informações, timers, rotinas e controle de dispositivos de casa inteligente compatíveis. Formato compacto para quarto, sala ou escritório.',
    originalPriceCents:43000,promotionalPriceCents:37000,maxQuantity:2,
    variants:[{name:'Carvão',swatch:'#343434',images:[{src:'/assets/product-gallery/normalized/echo-dot-5-3.png',alt:'Echo Dot 5ª geração Carvão',position:'center center',fit:'contain',background:'#fafbf9'}]},{name:'Branco Gelo',swatch:'#f2f2ef',images:[{src:'/assets/product-gallery/normalized/echo-dot-5-1.png',alt:'Echo Dot 5ª geração Branco Gelo',position:'center center',fit:'contain',background:'#fafbf9'}]},{name:'Azul Marinho',swatch:'#3f596d',images:[{src:'/assets/product-gallery/normalized/echo-dot-5-2.png',alt:'Echo Dot 5ª geração Azul Marinho',position:'center center',fit:'contain',background:'#f5f7f8'}]}],
    specifications:[{label:'Assistente',value:'Alexa'},{label:'Conectividade',value:'Wi‑Fi e Bluetooth'},{label:'Áudio',value:'Alto-falante inteligente compacto'},{label:'Recursos',value:'Rotinas, timers e casa inteligente'},{label:'Geração',value:'5ª geração'}]
  },
  {
    id:'qcy-t13',slug:'qcy-t13',name:'Fone Bluetooth QCY T13',shortName:'QCY T13',category:'Áudio',
    description:'Fones true wireless com quatro microfones e tecnologia ENC para chamadas, driver dinâmico de 7,2 mm, Bluetooth 5.1 e autonomia total de até 40 horas com o estojo de carregamento.',
    originalPriceCents:17000,promotionalPriceCents:13000,maxQuantity:5,
    variants:[{name:'Preto',swatch:'#111111',images:[{src:'https://www.qcy.com/cdn/shop/files/T13_-1_9fa983e0-67da-414e-84f3-36ae8d373764.png?v=1779672668&width=1946',alt:'QCY T13 Preto com estojo aberto'},{src:'https://www.qcy.com/cdn/shop/files/T13_-2_599e9ffe-0836-4d1c-b355-6c41cbb17c69.png?v=1779672669&width=1946',alt:'QCY T13 Preto com estojo fechado'},{src:'https://www.qcy.com/cdn/shop/files/T13_-1.png?v=1779672679&width=1946',alt:'QCY T13 vista frontal'}]},{name:'Branco',swatch:'#f4f4f4',images:[{src:'https://www.qcy.com/cdn/shop/files/T13_-1.png?v=1779672679&width=1946',alt:'QCY T13 Branco com estojo aberto'},{src:'https://www.qcy.com/cdn/shop/files/T13_-1_9fa983e0-67da-414e-84f3-36ae8d373764.png?v=1779672668&width=1946',alt:'QCY T13 detalhe do produto'},{src:'https://www.qcy.com/cdn/shop/files/T13_-2_599e9ffe-0836-4d1c-b355-6c41cbb17c69.png?v=1779672669&width=1946',alt:'QCY T13 vista adicional'}]},{name:'Rosa',swatch:'#efc7d0',images:[{src:'https://cdn.webshopapp.com/shops/87774/files/435081409/qcy-t13-draadloze-oortjes-bluetooth-51-oordopjes-e.jpg',alt:'QCY T13 cores disponíveis'}]}],
    specifications:[{label:'Bluetooth',value:'5.1'},{label:'Chamadas',value:'4 microfones com ENC'},{label:'Driver',value:'7,2 mm'},{label:'Autonomia',value:'Até 40 h com estojo'},{label:'Proteção',value:'IPX5'}]
  },
  {
    id:'mi-band-8',slug:'mi-band-8',name:'Smartband Xiaomi Smart Band 8',shortName:'Xiaomi Smart Band 8',category:'Wearables',
    description:'Pulseira inteligente com tela AMOLED de 1,62 polegadas, brilho de até 600 nits, sensores de atividade e saúde, resistência à água 5 ATM e autonomia típica de até 16 dias.',
    originalPriceCents:26000,promotionalPriceCents:22000,maxQuantity:4,
    variants:[{name:'Preto-grafite',swatch:'#242424',images:[{src:'https://i02.appmifile.com/220_operator_sg/23/05/2023/db37e9f72ec6603c87f43b8cef099ba6.png',alt:'Xiaomi Smart Band 8 Preto-grafite'},{src:'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-8/pc/overview/95908e02e273ffe5d639dede9eb5a25c.jpg',alt:'Xiaomi Smart Band 8 em uso'},{src:'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-8/pc/overview/41dc0b305b60a45144cd7838d7dc4f8f.png',alt:'Xiaomi Smart Band 8 detalhe'}]},{name:'Dourado',swatch:'#d7c49a',images:[{src:'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-8/pc/overview/a81f33f89b7ed7b134bc96f075842ba2.png',alt:'Xiaomi Smart Band 8 Dourado'},{src:'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-8/pc/overview/c4d09b5f86410df06119e126f19e1120.png',alt:'Xiaomi Smart Band 8 detalhe dourado'},{src:'https://i02.appmifile.com/220_operator_sg/23/05/2023/db37e9f72ec6603c87f43b8cef099ba6.png',alt:'Xiaomi Smart Band 8'}]}],
    specifications:[{label:'Tela',value:'AMOLED 1,62”'},{label:'Brilho',value:'Até 600 nits'},{label:'Autonomia típica',value:'Até 16 dias'},{label:'Resistência',value:'5 ATM'},{label:'Conectividade',value:'Bluetooth 5.1 BLE'}]
  },
  {
    id:'jbl-go-4',slug:'jbl-go-4',name:'Caixa de Som JBL GO 4',shortName:'JBL GO 4',category:'Áudio',
    description:'Caixa de som Bluetooth portátil e compacta, com potência de 4,2 W, bateria para até 7 horas de reprodução, Bluetooth 5.3 e proteção IP67 contra água e poeira.',
    originalPriceCents:30000,promotionalPriceCents:25000,maxQuantity:4,
    variants:[{name:'Preto',swatch:'#101010',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Preto'}]},{name:'Azul',swatch:'#2b62a4',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Azul'}]},{name:'Vermelho',swatch:'#d74a41',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Vermelho'}]},{name:'Roxo',swatch:'#6d4c88',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Roxo'}]},{name:'Rosa',swatch:'#e4a0b5',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Rosa'}]},{name:'Branco',swatch:'#f1f1ef',images:[{src:'https://vn.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw15a095de/JBL_GO_4_HERO_BLACK_48156_x4.png?sfrm=png&sw=537',alt:'JBL GO 4 Branco'}]}],
    specifications:[{label:'Potência',value:'4,2 W'},{label:'Autonomia',value:'Até 7 h'},{label:'Bluetooth',value:'5.3'},{label:'Proteção',value:'IP67'},{label:'Formato',value:'Portátil'}]
  },
  {
    id:'baseus-super-si-20w',slug:'baseus-super-si-20w',name:'Carregador Turbo Baseus Super Si 20W',shortName:'Baseus Super Si 20W',category:'Acessórios',
    description:'Carregador compacto USB‑C de 20 W com suporte a protocolos de carregamento rápido, indicado para smartphones e outros dispositivos USB‑C compatíveis.',
    originalPriceCents:9000,promotionalPriceCents:6000,maxQuantity:5,
    variants:[{name:'Branco',swatch:'#f2f2f2',images:[{src:'https://cz.baseus.com/cdn/shop/files/file_3e6e7c34-c6d1-41e0-91e0-08171c95a7ce.jpg?v=1748248170&width=1200',alt:'Carregador Baseus Super Si 20W Branco'}]},{name:'Preto',swatch:'#222222',images:[{src:'https://cz.baseus.com/cdn/shop/files/file_3e6e7c34-c6d1-41e0-91e0-08171c95a7ce.jpg?v=1748248170&width=1200',alt:'Carregador Baseus Super Si 20W Preto'}]}],
    specifications:[{label:'Potência',value:'20 W'},{label:'Porta',value:'USB‑C'},{label:'Carregamento',value:'Rápido PD/QC compatível'},{label:'Formato',value:'Compacto'},{label:'Uso',value:'Dispositivos USB‑C compatíveis'}]
  },
  {
    id:'xiaomi-power-bank-10000',slug:'xiaomi-power-bank-10000',name:'Power Bank Xiaomi 10000mAh',shortName:'Xiaomi Power Bank 10000mAh',category:'Acessórios',
    description:'Bateria portátil de 10.000 mAh com carregamento de até 22,5 W, entrada USB‑C e saídas USB‑A/USB‑C, permitindo alimentar até três dispositivos compatíveis ao mesmo tempo.',
    originalPriceCents:16000,promotionalPriceCents:12000,maxQuantity:4,
    variants:[{name:'Preto',swatch:'#2a2a2a',images:[{src:'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-power-bank-10000mah-22w-lite/pc/0788fd841fc0eb122e99b08306af573a.jpg',alt:'Power Bank Xiaomi 10000mAh Preto'}]}],
    specifications:[{label:'Capacidade típica',value:'10.000 mAh'},{label:'Potência',value:'Até 22,5 W'},{label:'Entrada',value:'USB‑C'},{label:'Saídas',value:'USB‑A e USB‑C'},{label:'Conexões simultâneas',value:'Até 3 dispositivos'}]
  },
  {
    id:'roku-express',slug:'roku-express',name:'Roku Express',shortName:'Roku Express',category:'Streaming',
    description:'Player de streaming compacto para TVs com HDMI, compatível com vídeo de até 1080p Full HD. Conecta-se ao Wi‑Fi e acompanha controle remoto Roku para navegação pelos canais e aplicativos compatíveis.',
    originalPriceCents:24000,promotionalPriceCents:20000,maxQuantity:4,
    variants:[{name:'Preto',swatch:'#111111',images:[{src:'https://images.contentstack.io/v3/assets/blt7e9bdfb5b3e9fadb/bltb12106f9b21a3613/69819f96c2dc571787eff6d6/Roku-Express-2020-650.jpg',alt:'Roku Express Preto com controle remoto'}]}],
    specifications:[{label:'Resolução',value:'Até 1080p Full HD'},{label:'Modelo de referência',value:'Roku Express 3960'},{label:'Conexão à TV',value:'HDMI'},{label:'Rede',value:'Wi‑Fi'},{label:'Controle',value:'Controle remoto Roku'}]
  },
  {
    id:'amazfit-bip-5',slug:'amazfit-bip-5',name:'Smartwatch Amazfit Bip 5',shortName:'Amazfit Bip 5',category:'Wearables',
    description:'Smartwatch com tela ampla de 1,91 polegadas, GPS integrado, mais de 120 modos esportivos e recursos de acompanhamento de saúde. A bateria pode chegar a cerca de 10 dias no uso típico.',
    originalPriceCents:45000,promotionalPriceCents:38000,maxQuantity:2,
    variants:[{name:'Preto Suave',swatch:'#1f1f1f',images:[{src:'https://us.amazfit.com/cdn/shop/files/20230725-155407.jpg?v=1715288783&width=416',alt:'Amazfit Bip 5 Preto Suave'}]},{name:'Branco Creme',swatch:'#eee9de',images:[{src:'https://us.amazfit.com/cdn/shop/files/20230725-155407.jpg?v=1715288783&width=416',alt:'Amazfit Bip 5 Branco Creme'}]},{name:'Rosa Pastel',swatch:'#e8b8c2',images:[{src:'https://us.amazfit.com/cdn/shop/files/20230725-155407.jpg?v=1715288783&width=416',alt:'Amazfit Bip 5 Rosa Pastel'}]}],
    specifications:[{label:'Tela',value:'1,91”'},{label:'GPS',value:'Integrado'},{label:'Modos esportivos',value:'120+'},{label:'Autonomia típica',value:'Até 10 dias'},{label:'Recursos',value:'Atividade e métricas de saúde'}]
  },
  {
    id:'galaxy-a05',slug:'galaxy-a05',name:'Samsung Galaxy A05 128GB',shortName:'Galaxy A05 128GB',category:'Smartphones',
    description:'Smartphone com 128 GB de armazenamento, tela de 6,7 polegadas, câmera principal de 50 MP e bateria de 5.000 mAh com suporte a carregamento rápido de 25 W.',
    originalPriceCents:75000,promotionalPriceCents:65000,maxQuantity:1,
    variants:[{name:'Preto',swatch:'#171717',images:[{src:'https://shop.samsung.com/latin/cac/pub/media/catalog/product/s/m/sm-a055_galaxy-a05_all-logo_thumb.png',alt:'Samsung Galaxy A05 Preto'}]},{name:'Prata',swatch:'#c6c7c5',images:[{src:'https://shop.samsung.com/latin/cac/pub/media/catalog/product/s/m/sm-a055_galaxy-a05_all-logo_thumb.png',alt:'Samsung Galaxy A05 Prata'}]},{name:'Verde',swatch:'#b8c8ae',images:[{src:'https://shop.samsung.com/latin/cac/pub/media/catalog/product/s/m/sm-a055_galaxy-a05_all-logo_thumb.png',alt:'Samsung Galaxy A05 Verde'}]}],
    specifications:[{label:'Armazenamento',value:'128 GB'},{label:'Tela',value:'6,7” HD+'},{label:'Câmera principal',value:'50 MP'},{label:'Bateria',value:'5.000 mAh'},{label:'Carregamento',value:'Até 25 W'}]
  },
  {
    id:'redmi-buds-5',slug:'redmi-buds-5',name:'Fone Bluetooth Redmi Buds 5',shortName:'Redmi Buds 5',category:'Áudio',
    description:'Fones true wireless com cancelamento ativo de ruído de até 46 dB, driver dinâmico de 12,4 mm e autonomia total de até 40 horas com o estojo de carregamento.',
    originalPriceCents:22000,promotionalPriceCents:16000,maxQuantity:4,
    variants:[{name:'Preto',swatch:'#202020',images:[{src:'https://i02.appmifile.com/782_operator_sg/29/01/2024/6d88681c6abc105ea1c5373100fcd2c7.jpg',alt:'Redmi Buds 5 Preto'}]},{name:'Branco',swatch:'#f4f4f4',images:[{src:'https://i02.appmifile.com/782_operator_sg/29/01/2024/6d88681c6abc105ea1c5373100fcd2c7.jpg',alt:'Redmi Buds 5 Branco'}]}],
    specifications:[{label:'Cancelamento de ruído',value:'ANC até 46 dB'},{label:'Driver',value:'12,4 mm'},{label:'Autonomia',value:'Até 40 h com estojo'},{label:'Bluetooth',value:'5.3'},{label:'Recursos',value:'Modo transparência e conexão dupla'}]
  }
];

const PRODUCT_MAP=new Map(PRODUCTS.map(p=>[p.id,p]));
export function getProduct(id){return PRODUCT_MAP.get(String(id||''))||null;}
export function validLine(line){const p=getProduct(line?.productId);return Boolean(p)&&p.variants.some(v=>v.name===line.variant)&&Number.isInteger(line.quantity)&&line.quantity>=1&&line.quantity<=p.maxQuantity;}
export function calculate(lines){return lines.reduce((total,line)=>{const p=getProduct(line.productId);return total+(p?p.promotionalPriceCents*line.quantity:0);},0);}
export function enrichLines(lines){return lines.map(line=>{const product=getProduct(line.productId);return {line,product};}).filter(x=>x.product);}
export function publicCatalog(){return {storeName:STORE_NAME,payment:{method:'pix',label:'PIX',maxOrderCents:PIX_MAX_CENTS},categories:[...new Set(PRODUCTS.map(p=>p.category))],products:PRODUCTS};}
