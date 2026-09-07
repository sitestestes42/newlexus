# Lexus Elétricos — catálogo multi-produto + PIX

Versão pronta para Vercel (Framework Preset: Other), com frontend estático e Vercel Functions no backend.

## Catálogo
12 produtos: Redmi Note 13 128GB, Fire TV Stick Full HD, Echo Dot 5ª geração, QCY T13, Xiaomi Smart Band 8, JBL GO 4, Baseus Super Si 20W, Xiaomi Power Bank 10000mAh, Roku Express, Amazfit Bip 5, Galaxy A05 128GB e Redmi Buds 5.

## Backend
- Supabase Auth + cookies HttpOnly
- Catálogo e preços oficiais no backend
- Pedido recalculado no servidor
- PanteraPay PIX em `/api/payments/pix`
- Consulta de status em `/api/payments/status`
- Webhook em `/api/payments/webhook` com revalidação da transação diretamente na PanteraPay
- Limite seguro de R$ 999,99 por cobrança aplicado no frontend e no backend

## Vercel Environment Variables
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SECRET_KEY
- VITE_HCAPTCHA_SITEKEY
- PANTEPAY_API_URL
- PANTEPAY_SECRET_KEY
- PANTEPAY_WEBHOOK_SECRET (pode permanecer configurada; não é exposta ao navegador)

## Atualização do banco existente
Execute `supabase/catalog-migration.sql` no SQL Editor do Supabase uma vez. Em instalação nova, execute `supabase/schema.sql`.

## Vercel
- Framework Preset: Other
- Root Directory: ./
- Build Command: vazio
- Output Directory: vazio
