# Publicar o FiscalLex Angola no Cloudflare Workers

Este projecto está preparado para ser construído e publicado automaticamente a partir do repositório GitHub.

## 1. Ligar o GitHub ao Cloudflare

1. Entre em [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Abra **Workers & Pages**.
3. Escolha **Create application** e a opção para importar um repositório Git.
4. Autorize o acesso ao GitHub, se for solicitado.
5. Seleccione `mjcharata/FiscalLex_angola`.

## 2. Configurar a construção

Use os seguintes valores:

- **Nome do Worker:** `fiscallex-angola`
- **Branch de produção:** `main`
- **Directório raiz:** `/`
- **Comando de construção:** `npm run build`
- **Comando de publicação:** `npm run deploy:cloudflare`
- **Comando para outras branches:** `npm run preview:cloudflare`

Não adicione variáveis ou segredos: a versão actual não utiliza base de dados nem serviços privados.

## 3. Publicar

Confirme a criação do Worker. O Cloudflare instalará as dependências, construirá o projecto e publicará o site.

Quando o processo terminar, será apresentado um endereço semelhante a:

`https://fiscallex-angola.<seu-subdominio>.workers.dev`

Cada alteração futura enviada para a branch `main` iniciará uma nova publicação automática.

## 4. Domínio próprio

Para usar um domínio próprio, abra o Worker publicado e escolha **Settings → Domains & Routes → Add**. Siga as instruções para associar o domínio à sua conta Cloudflare.

## Verificação local opcional

```bash
npm install
npm run build
```

O comando de construção deve terminar sem erros antes da publicação.
