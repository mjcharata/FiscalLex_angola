# FiscalLex Angola

Biblioteca independente de legislação fiscal e tributária angolana. O portal reúne códigos e leis-base, alterações legislativas, medidas tributárias do OGE 2026, circulares e instrutivos publicados pela Administração Geral Tributária.

> Esta é uma base de consulta não oficial. A redacção publicada no Diário da República prevalece para efeitos jurídicos.

## Conteúdo

- 13 códigos e leis fiscais fundamentais;
- histórico de alterações por diploma;
- medidas tributárias do OGE 2026;
- circulares, anexos e instrutivos da AGT;
- pesquisa por diploma, imposto, tema e ano;
- ligações directas para Angolex e documentos oficiais da AGT.

## Colocar no GitHub

1. Crie um repositório vazio em [github.com/new](https://github.com/new).
2. Extraia o ficheiro ZIP deste projecto.
3. No repositório, escolha **Add file → Upload files**.
4. Envie todos os ficheiros e pastas extraídos.
5. Escreva uma mensagem como `Publicar FiscalLex Angola` e confirme em **Commit changes**.

Também pode usar Git no computador:

```bash
git init
git add .
git commit -m "Publicar FiscalLex Angola"
git branch -M main
git remote add origin https://github.com/SEU-UTILIZADOR/fiscallex-angola.git
git push -u origin main
```

## Executar localmente

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço local apresentado no terminal.

Para verificar a versão de produção:

```bash
npm run build
```

## Publicação na Internet

O repositório pode ser mantido normalmente no GitHub. Esta aplicação usa Vinext e uma saída compatível com Cloudflare Workers, pelo que não é um site estático pronto para GitHub Pages.

Para publicar directamente a partir do GitHub, ligue o repositório ao **Cloudflare Workers Builds** e use:

- comando de construção: `npm run build`;
- comando de publicação: `npm run deploy:cloudflare`;
- branch de produção: `main`;
- directório raiz: `/`.

Não são necessárias variáveis ou bases de dados para a versão actual. Consulte [CLOUDFLARE.md](CLOUDFLARE.md) para o guia completo.

## Estrutura principal

- `app/page.tsx` — conteúdo, pesquisa e dados da biblioteca;
- `app/globals.css` — identidade visual e responsividade;
- `app/layout.tsx` — metadados e imagem de partilha;
- `public/og.png` — imagem social do portal;
- `package.json` — dependências e comandos do projecto.

## Fontes

- [Angolex — Direito Tributário](https://angolex.com/paginas/ramos-direito/direito-tributario.html)
- [AGT — Circulares](https://agt.minfin.gov.ao/#!/legislacao/circulares)
- [AGT — Instrutivos](https://agt.minfin.gov.ao/#!/legislacao/instrutivos)

Actualização editorial da base: 3 de Agosto de 2026.
