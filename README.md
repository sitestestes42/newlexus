# Lexus Elétricos — rebuild no visual do antigo NEXUS TECH

Este projeto preserva a estrutura visual de e-commerce do site original (header, busca, menu, hero, cards, produto, carrinho e checkout), mas toda a identidade e o fluxo principal foram convertidos para Lexus Elétricos.

## Backend
- `/api/catalog` é a fonte oficial de produto e preço.
- `/api/auth/*` usa Supabase Auth e cookies HttpOnly.
- `/api/orders/create` valida login, itens, variantes, quantidades, endereço e recalcula o total no servidor.
- `/api/orders/list` fornece o histórico do usuário autenticado.
- Segredos permanecem somente nas Vercel Functions.

O carrinho fica no navegador apenas como estado de interface; ele nunca é fonte de verdade para o preço do pedido.

## Vercel
Framework Preset: Other
Root Directory: ./
Build Command: vazio
Output Directory: vazio

Variáveis: SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, VITE_HCAPTCHA_SITEKEY.

## Supabase
Execute `supabase/schema.sql` no SQL Editor.

## Pagamento
Nenhuma cobrança é simulada. O pedido é salvo como `pending` até a integração de um provedor compatível com o valor do produto.
