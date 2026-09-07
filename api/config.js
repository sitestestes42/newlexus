import {json,method} from './_lib/http.js';
export default async function handler(req,res){if(req.method!=='GET')return method(res,['GET']);return json(res,200,{hcaptchaSitekey:process.env.HCAPTCHA_SITEKEY||process.env.VITE_HCAPTCHA_SITEKEY||''});}
