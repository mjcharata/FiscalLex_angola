# FiscalLex Angola

Biblioteca independente de legislação fiscal e tributária angolana. O portal reúne o **texto integral** dos códigos e leis-base, o histórico de alterações por diploma, as medidas tributárias do OGE 2026 e as circulares e instrutivos publicados pela Administração Geral Tributária.

> Esta é uma base de consulta não oficial. A redacção publicada no Diário da República prevalece para efeitos jurídicos.

## O que mudou nesta versão

Os códigos deixaram de remeter para documentos externos: o articulado passou a estar **dentro da aplicação, em HTML**, artigo a artigo. Cada diploma tem uma página própria em `/codigos/<slug>`, com índice navegável, pesquisa dentro do texto, ligações permanentes por artigo e uma folha de estilo de impressão que produz um PDF limpo a partir do browser.

O texto é renderizado no servidor, pelo que está presente no documento HTML mesmo com o JavaScript desligado — fica indexável pelos motores de busca e utilizável com leitores de ecrã e com a função de pesquisa do próprio browser.

Só as circulares e os instrutivos da AGT continuam a ligar aos PDF oficiais, por serem documentos digitalizados sem camada de texto.

## Conteúdo

- 13 códigos e leis fiscais fundamentais em texto integral — 1441 artigos, cerca de 1,19 milhões de caracteres de texto legal;
- histórico de alterações por diploma, com ligação ao diploma alterador;
- medidas tributárias do OGE 2026;
- 65 circulares, anexos e instrutivos da AGT;
- pesquisa por diploma, imposto, tema e ano na página inicial, e pesquisa por artigo dentro de cada código;
- ligações directas para o Angolex e para os documentos oficiais da AGT.

### Cobertura por diploma

| Diploma | Abrev. | Artigos | Estado |
| --- | --- | ---: | --- |
| Código Geral Tributário — Lei n.º 21/14 | CGT | 229 | íntegra |
| Código do Processo Tributário — Lei n.º 22/14 | CPT | 122 | íntegra |
| Código das Execuções Fiscais — Lei n.º 20/14 | CEF | 181 | íntegra |
| Código Aduaneiro — Decreto-Lei n.º 5/06 | CA | 525 | íntegra |
| Código do Imposto Industrial — Lei n.º 19/14 | CII | 80 | lacunas nos arts. 77.º–80.º |
| Código do IRT — Lei n.º 18/14 | IRT | 35 | íntegra |
| Código do IAC — DLP n.º 2/14 | IAC | 51 | íntegra |
| Código do Imposto Predial — Lei n.º 20/20 | IP | 32 | íntegra |
| Código do Imposto de Selo — DLP n.º 3/14 | IS | 22 | íntegra |
| Código do IVA — Lei n.º 7/19 | IVA | 82 | lacunas em 10 pontos |
| Lei do Imposto Especial de Consumo — Lei n.º 16/21 | IEC | 19 | íntegra |
| Código dos Benefícios Fiscais — Lei n.º 8/22 | CBF | 48 | lacuna no art. 12.º |
| Lei do IVM — Lei n.º 24/20 | IVM | 15 | íntegra |

As lacunas resultam de limites de leitura das páginas de origem e estão assinaladas artigo a artigo no próprio texto, com indicação do que falta. Nenhum texto foi inventado para as preencher. Corra `npm run diplomas:audit` para ver o estado actual.

## Metodologia da transcrição

O articulado foi transcrito do ramo de Direito Tributário do Angolex, preservando a redacção e a ortografia originais — incluindo as gralhas da fonte, que **não** são corrigidas, por o objectivo ser reproduzir o que a fonte publica e não editar o diploma.

Os diplomas que sofreram alterações relevantes são apresentados consolidados. Quando a fonte publica o texto-base e a lei alteradora em páginas separadas, a consolidação foi feita na extracção: adopta-se a redacção mais recente de cada artigo e assinala-se com uma nota a lei que lha deu. É o caso do Código do Imposto Industrial (Leis n.º 26/20 e n.º 27/22) e do Código do IVA (Lei n.º 14/23). O campo `consolidation` de cada diploma descreve exactamente o que a base representa.

“Vigente” indica que não foi identificada revogação expressa nas fontes consultadas. As medidas do OGE podem ter duração anual e devem ser lidas com o diploma-base.

## Executar localmente

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço local apresentado no terminal.

Para verificar a versão de produção e correr a bateria de testes:

```bash
npm run build
npm test
```

## Estrutura do projecto

### Aplicação

- `app/page.tsx` — página inicial: pesquisa, fichas dos códigos, actualizações, circulares e instrutivos;
- `app/codigos/reader.tsx` — componente de leitura de um diploma (servidor): índice, hierarquia, artigos e navegação;
- `app/codigos/reader-tools.tsx` — barra de pesquisa dentro do diploma e botão de impressão (cliente);
- `app/codigos/<slug>/page.tsx` — rotas geradas, uma por diploma;
- `app/globals.css` — identidade visual, estilos de leitura e folha de impressão;
- `app/layout.tsx` — metadados e imagem de partilha.

### Dados

- `data/diplomas/<slug>.json` — texto integral de cada diploma;
- `data/diplomas/types.ts` — estrutura de dados de um diploma;
- `data/codigos-meta.ts` — metadados dos códigos (diploma, área, estado, histórico de alterações);
- `data/cobertura.json` — cobertura da transcrição, gerada pela auditoria;
- `data/extract/<slug>.jsonl` — ficheiros de extracção, um artigo por linha (fonte dos JSON).

### Manutenção da base

```bash
# validar um ficheiro de extracção e gerar o JSON do diploma
node scripts/jsonl-to-diploma.mjs data/extract/cgt.jsonl --write

# regenerar as rotas a partir de data/diplomas/*.json
npm run diplomas:routes

# auditar integridade e cobertura, e actualizar data/cobertura.json
npm run diplomas:audit
```

O validador recusa ficheiros com JSON inválido, campos em falta, blocos vazios, identificadores duplicados ou quebras na numeração dos artigos. A auditoria acrescenta a detecção de lacunas declaradas, prefixos de alínea residuais e tabelas irregulares.

Para acrescentar ou actualizar um diploma: edite `data/extract/<slug>.jsonl`, corra o validador com `--write`, depois `diplomas:routes` e `diplomas:audit`, e por fim `npm test`.

### Estrutura de um artigo

```jsonc
{
  "id": "artigo-1",              // âncora da ligação permanente
  "label": "Artigo 1.º",         // "Artigo 15.º-A" para aditados
  "epigraph": "Âmbito de aplicação",
  "path": ["TÍTULO I - ...", "CAPÍTULO I - ..."],   // hierarquia onde se insere
  "blocks": [
    { "t": "p", "x": "1. O presente Código aplica-se..." },
    { "t": "list", "style": "alpha", "items": ["..."] },
    { "t": "table", "headers": ["..."], "rows": [["..."]] },
    { "t": "note", "x": "Redacção dada pela Lei n.º 26/20, de 20 de Julho" }
  ]
}
```

## Publicação na Internet

Esta aplicação usa Vinext com saída compatível com Cloudflare Workers, pelo que não é um site estático pronto para GitHub Pages.

Para publicar directamente a partir do GitHub, ligue o repositório ao **Cloudflare Workers Builds** e use:

- comando de construção: `npm run build`;
- comando de publicação: `npm run deploy:cloudflare`;
- branch de produção: `main`;
- directório raiz: `/`.

Não são necessárias variáveis nem bases de dados. O bundle do servidor ocupa cerca de 0,7 MB comprimido, dentro do limite de 3 MB do plano gratuito. Consulte [CLOUDFLARE.md](CLOUDFLARE.md) para o guia completo.

## Fontes

- [Angolex — Direito Tributário](https://angolex.com/paginas/ramos-direito/direito-tributario.html)
- [AGT — Circulares](https://agt.minfin.gov.ao/#!/legislacao/circulares)
- [AGT — Instrutivos](https://agt.minfin.gov.ao/#!/legislacao/instrutivos)

Actualização editorial da base: 4 de Agosto de 2026.
