export const PRODUCT={
  id:'inow-1000w',
  name:'Bicicleta Elétrica INOW 1000W',
  shortName:'INOW 1000W',
  description:'Motor de 1000 W, bateria 48 V / 15,6 Ah e configuração urbana com aro 20 para deslocamentos práticos no dia a dia.',
  originalPriceCents:669999,
  promotionalPriceCents:359990,
  maxQuantity:10,
  variants:[
    {name:'Preto',swatch:'#171814',images:[{src:'https://i.postimg.cc/26s1r0F3/inow-preta.png',alt:'Bicicleta elétrica INOW 1000W na cor preta'}]},
    {name:'Caramelo',swatch:'#b37a45',images:[{src:'https://i.postimg.cc/QMM9b9dX/inow-caramelo-2.webp',alt:'Bicicleta elétrica INOW 1000W na cor caramelo'},{src:'https://i.postimg.cc/QxRTjxmT/inow-caramelo.webp',alt:'Bicicleta elétrica INOW 1000W caramelo, vista adicional'}]}
  ],
  specifications:[
    {label:'Motor',value:'1000 W'},
    {label:'Velocidade máxima',value:'45 km/h'},
    {label:'Bateria',value:'48 V / 15,6 Ah'},
    {label:'Aro',value:'20"'},
    {label:'Capacidade',value:'até 200 kg'}
  ]
};
export const allowedVariants=new Set(PRODUCT.variants.map(v=>v.name));
export function validLine(line){return Boolean(line)&&typeof line==='object'&&line.productId===PRODUCT.id&&allowedVariants.has(line.variant)&&Number.isInteger(line.quantity)&&line.quantity>=1&&line.quantity<=PRODUCT.maxQuantity;}
export function calculate(lines){return lines.reduce((n,l)=>n+PRODUCT.promotionalPriceCents*l.quantity,0);}
export function publicCatalog(){return PRODUCT;}
