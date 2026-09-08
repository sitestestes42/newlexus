# Bot Zelvon — Geoapify

## Deploy no Vercel

1. Use esta pasta como a raiz do projeto. Na raiz devem aparecer `index.html`, `package.json`, `vercel.json` e a pasta `api/`.
2. No Vercel, em Settings > Environment Variables, crie `GEOAPIFY_API_KEY` com sua chave.
3. Se o projeto tiver uma configuração **Root Directory**, deixe em branco (`./`) ou aponte exatamente para esta pasta.
4. Faça um novo deploy.
5. Teste `/api/health`. Deve retornar `configured: true`.

A Vercel detecta automaticamente arquivos dentro da pasta `/api` como Functions. Esta versão não usa a propriedade `functions` no `vercel.json`, evitando o erro de padrão não encontrado.
