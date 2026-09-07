# Lexus Elétricos — V5 Launch

Versão preparada para publicação na Vercel com a identidade visual final da Lexus Elétricos.

## O que entrou nesta versão

- Logo própria da Lexus Elétricos no header e footer
- Favicon e manifest
- Homepage redesenhada com visual premium
- Cards de produto padronizados
- Imagens sem molduras duras e com enquadramento consistente
- Galeria com 3 visualizações por produto; quando o catálogo já possui fotos distintas, elas são preservadas
- Seleção de cores no produto, carrinho, checkout e pedido
- PIX mantido como forma de pagamento
- Login, cadastro, conta e histórico de pedidos mantidos
- Textos técnicos e informações internas removidos da interface pública
- Fallback visual para imagens externas indisponíveis
- `robots.txt`, `sitemap.xml` e página `404.html`

## Deploy

No GitHub, envie o conteúdo desta pasta para o repositório `newlexus`, substituindo os arquivos existentes.

Na Vercel, mantenha:

- Framework Preset: `Other`
- Root Directory: `./`
- Build Command: vazio
- Output Directory: vazio

As variáveis de ambiente já configuradas continuam válidas.

## Banco

Esta versão não exige nova migração de banco se o `catalog-migration.sql` da versão anterior já foi executado.

## Teste rápido após o deploy

1. Abra `/api/health`
2. Abra a home e confira o catálogo
3. Entre/crie uma conta
4. Escolha um produto e uma cor
5. Adicione ao carrinho
6. Confira se a cor aparece no carrinho e checkout
7. Gere o PIX de teste
8. Abra `Minha Conta` e confira o pedido
