# Como substituir no GitHub

1. Extraia o ZIP.
2. No repositório `newlexus`, use **Add file → Upload files**.
3. Envie o conteúdo de dentro da pasta extraída, preservando as pastas `api`, `assets` e `supabase`.
4. Faça Commit.
5. No Supabase, execute `supabase/catalog-migration.sql` uma vez porque o banco anterior limitava a variante a Preto/Caramelo.
6. Aguarde o deploy da Vercel.

## Vercel
Continue com:
- Framework Preset: Other
- Root Directory: ./
- Build Command: vazio
- Output Directory: vazio

## Environment Variables
Mantenha as que já existem:
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SECRET_KEY
- VITE_HCAPTCHA_SITEKEY
- PANTEPAY_API_URL
- PANTEPAY_SECRET_KEY
- PANTEPAY_WEBHOOK_SECRET

Os arquivos legados `main.js`, `dados.js`, `script.js`, `carrinho.js`, `checkout.js` e `checkout-novo.html` permanecem apenas como neutralizadores de versões antigas; o site ativo usa `/assets/*.js` e `/api/*`.
