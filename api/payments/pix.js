import {json,method,readBody,sameOrigin} from '../_lib/http.js';
import {authenticated,ensureAdminEnv,adminHeaders,responseMessage} from '../_lib/supabase.js';
import {PIX_MAX_CENTS} from '../_lib/catalog.js';
import {createPix,getTransaction,publicPix,orderStatusFromProvider} from '../_lib/pantepay.js';

async function currentUserId(admin,openId){const r=await fetch(`${admin.url}/rest/v1/users?select=id&openId=eq.${encodeURIComponent(openId)}&limit=1`,{headers:adminHeaders(admin.secretKey),cache:'no-store'});if(!r.ok)throw new Error(await responseMessage(r));const rows=await r.json().catch(()=>[]);return Number(rows?.[0]?.id||0);}
async function getOwnedOrder(admin,orderId,userId){const r=await fetch(`${admin.url}/rest/v1/orders?select=id,userId,totalCents,status,providerReference&id=eq.${encodeURIComponent(orderId)}&userId=eq.${userId}&limit=1`,{headers:adminHeaders(admin.secretKey),cache:'no-store'});if(!r.ok)throw new Error(await responseMessage(r));return (await r.json().catch(()=>[]))?.[0]||null;}
async function updateOrder(admin,id,patch){const r=await fetch(`${admin.url}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:adminHeaders(admin.secretKey,'return=minimal'),body:JSON.stringify({...patch,updatedAt:new Date().toISOString()}),cache:'no-store'});if(!r.ok)throw new Error(await responseMessage(r));}
function webhookUrl(req){const proto=String(req.headers['x-forwarded-proto']||'https').split(',')[0].trim();const host=String(req.headers['x-forwarded-host']||req.headers.host||'lexusshoper.store').split(',')[0].trim();return `${proto}://${host}/api/payments/webhook`;}

export default async function handler(req,res){if(req.method!=='POST')return method(res,['POST']);if(!sameOrigin(req))return json(res,403,{error:'Origem da requisição não permitida.'});try{
  const admin=ensureAdminEnv();const {user}=await authenticated(req,res);if(!user?.id)return json(res,401,{error:'Faça login para continuar.'});
  const body=await readBody(req);const orderId=typeof body.orderId==='string'?body.orderId.trim():'';if(!/^lx_[a-zA-Z0-9]{8,30}$/.test(orderId))return json(res,400,{error:'Pedido inválido.'});
  const userId=await currentUserId(admin,user.id);if(!userId)return json(res,404,{error:'Cliente não encontrado.'});
  const order=await getOwnedOrder(admin,orderId,userId);if(!order)return json(res,404,{error:'Pedido não encontrado.'});
  if(Number(order.totalCents)>PIX_MAX_CENTS)return json(res,422,{error:'Revise os itens do carrinho antes de continuar com o pagamento.'});
  if(order.status==='paid')return json(res,200,{orderId,status:'paid',message:'Este pedido já está pago.'});
  let providerBody;
  if(order.providerReference){providerBody=await getTransaction(order.providerReference);const normalized=orderStatusFromProvider(providerBody);if(normalized!==order.status)await updateOrder(admin,order.id,{status:normalized});}
  else{providerBody=await createPix({amount:Number(order.totalCents),webhook:webhookUrl(req)});const pix=publicPix(providerBody);if(!pix.id)throw new Error('Não foi possível identificar a transação.');await updateOrder(admin,order.id,{providerReference:pix.id,status:orderStatusFromProvider(providerBody)});}
  const pix=publicPix(providerBody);return json(res,200,{orderId,status:orderStatusFromProvider(providerBody),pix});
}catch(e){console.error('[payments/pix]',e);return json(res,502,{error:'Não foi possível gerar o PIX neste momento. Tente novamente.'});}}
