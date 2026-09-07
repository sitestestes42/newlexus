import {json,method} from '../_lib/http.js';import {authenticated,publicUser} from '../_lib/supabase.js';
export default async function handler(req,res){if(req.method!=='GET')return method(res,['GET']);try{const {user}=await authenticated(req,res);return json(res,200,{user:publicUser(user)});}catch(e){return json(res,500,{error:e instanceof Error?e.message:'Falha de autenticação.'});}}
