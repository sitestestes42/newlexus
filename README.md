# Lexus Elétricos — rebuild seguro

Este projeto substitui a antiga loja por uma versão enxuta e segura da **Lexus Elétricos**.

## O que ficou
- Home da INOW 1000W.
- Carrinho sem preço confiado ao navegador.
- Login e cadastro via Supabase Auth + hCaptcha.
- Sessão em cookies HttpOnly.
- Checkout com endereço de entrega.
- Criação de pedido no backend com preço recalculado no servidor.
- Histórico de pedidos na área da conta.
- SQL idempotente para `users`, `orders`, `order_items` e `order_shipping`.

## O que foi removido
- Marca, páginas e conteúdo da loja anterior.
- Catálogo, imagens e produtos da loja anterior.
- Checkout fictício de cartão/PIX no JavaScript.
- Páginas duplicadas e scripts antigos.
- Lógica que aceitava preço ou aprovação de pagamento vindos do navegador.
- PanteraPay desta versão: a API respondeu que o limite de depósito é R$ 1.000,00, abaixo do preço de R$ 3.599,90.

## Variáveis do Vercel
Use em **Settings -> Environment Variables**:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `VITE_HCAPTCHA_SITEKEY` (ou `HCAPTCHA_SITEKEY`)

Não coloque a secret key no GitHub.

## Banco
Execute `supabase/schema.sql` no SQL Editor do Supabase. Ele pode ser executado mesmo se as tabelas anteriores da Lexus já existirem.

## Vercel
Este projeto é estático + Vercel Functions. Não precisa de framework nem build de frontend.

Teste depois do deploy:
1. `/api/health` deve retornar `ok: true`.
2. `/api/catalog` deve mostrar a INOW 1000W por 359990 centavos.
3. Crie/entre em uma conta em `/entrar`.
4. Adicione a bicicleta e abra `/checkout`.
5. Confirme um pedido de teste e confira as tabelas no Supabase.

## Pagamento
O checkout registra o pedido como `pending`, mas **não cobra o cliente** nesta versão. Isso é proposital: o gateway anterior não suporta o valor do produto. O próximo gateway deve ser conectado somente no backend e o pedido só poderá mudar para `paid` por confirmação do provedor/webhook.
