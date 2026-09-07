const PAID_STATUSES=new Set(['paid','approved','payment.approved','success','completed']);
const FAILED_STATUSES=new Set(['failed','rejected','cancelled','canceled','expired','payment.failed']);

export function pantepayEnv(){
  let apiUrl=(process.env.PANTEPAY_API_URL||'').trim().replace(/\/+$/,'');
  apiUrl=apiUrl.replace(/\/transactions$/i,'');
  const secretKey=(process.env.PANTEPAY_SECRET_KEY||'').trim();
  return {apiUrl,secretKey};
}
export function ensurePantepayEnv(){const e=pantepayEnv();if(!e.apiUrl||!e.secretKey)throw new Error('Configuração da PanteraPay incompleta no Vercel.');return e;}
export function providerHeaders(secretKey){return {'Authorization':secretKey,'Content-Type':'application/json','Accept':'application/json'};}
export async function providerMessage(response){const text=await response.text().catch(()=> '');if(!text)return `PanteraPay respondeu ${response.status}`;try{const b=JSON.parse(text);return b.message||b.error||b.msg||b.detail||text.slice(0,350)}catch{return text.slice(0,350)}}
export function unwrapTransaction(body){if(!body||typeof body!=='object')return {};return body.transaction||body.data?.transaction||body.data||body;}
export function transactionStatus(body){const tx=unwrapTransaction(body);return String(tx.status||body?.status||'pending').trim().toLowerCase();}
export function orderStatusFromProvider(body){const s=transactionStatus(body);if(PAID_STATUSES.has(s))return 'paid';if(FAILED_STATUSES.has(s))return 'failed';return 'pending';}
export function publicPix(body){const tx=unwrapTransaction(body);return {id:tx.id||tx.transactionId||tx.transaction_id||null,status:transactionStatus(body),amount:Number(tx.amount||0)||0,qrCodeBase64:tx.qrCodeBase64||tx.qr_code_base64||tx.qrCode||null,copyPaste:tx.copyPaste||tx.copy_paste||tx.pixCopyPaste||null,expiresAt:tx.expiresAt||tx.expires_at||null};}
export async function createPix({amount,webhook}){const e=ensurePantepayEnv();const r=await fetch(`${e.apiUrl}/transactions`,{method:'POST',headers:providerHeaders(e.secretKey),body:JSON.stringify({amount,webhook}),cache:'no-store'});if(!r.ok)throw new Error(`${r.status}: ${await providerMessage(r)}`);return r.json();}
export async function getTransaction(id){const e=ensurePantepayEnv();const r=await fetch(`${e.apiUrl}/transactions/${encodeURIComponent(id)}`,{headers:providerHeaders(e.secretKey),cache:'no-store'});if(!r.ok)throw new Error(`${r.status}: ${await providerMessage(r)}`);return r.json();}
