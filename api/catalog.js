import {json,method} from './_lib/http.js';import {publicCatalog} from './_lib/catalog.js';
export default async function handler(req,res){if(req.method!=='GET')return method(res,['GET']);res.setHeader('Cache-Control','public, max-age=60, s-maxage=300');return res.status(200).json(publicCatalog());}
