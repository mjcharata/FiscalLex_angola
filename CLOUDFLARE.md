// Tipos partilhados para o texto integral dos diplomas fiscais.
// Cada diploma é um ficheiro JSON em data/diplomas/<slug>.json que respeita
// a estrutura Diploma abaixo. Os blocos preservam a redacção original
// (ortografia de 1945 usada nos diplomas angolanos incluída).

export type Block =
  | { t: "p"; x: string }                                        // parágrafo / número do artigo
  | { t: "list"; style?: "alpha" | "num" | "roman" | "dash"; items: string[] } // alíneas
  | { t: "table"; headers?: string[]; rows: string[][] }          // tabelas (taxas, anexos)
  | { t: "note"; x: string };                                     // anotação editorial (ex.: redacção dada por lei posterior)

export type Article = {
  id: string;        // âncora única, ex.: "artigo-1", "artigo-15a", "anexo-i"
  label: string;     // ex.: "Artigo 1.º", "Artigo 15.º-A", "Anexo I"
  epigraph: string;  // epígrafe do artigo (pode ser vazia)
  path?: string[];   // hierarquia onde o artigo se insere, ex.: ["TÍTULO I — ...", "CAPÍTULO II — ..."]
  blocks: Block[];   // corpo integral do artigo
};

export type Diploma = {
  slug: string;          // ex.: "cgt"
  abbr: string;          // ex.: "CGT"
  title: string;         // ex.: "Código Geral Tributário"
  diploma: string;       // ex.: "Lei n.º 21/14, de 22 de Outubro"
  consolidation: string; // descrição da consolidação apresentada
  sourceName: string;    // ex.: "Angolex"
  sourceUrl: string;     // página de origem do texto
  extractedAt: string;   // data da extracção, ex.: "2026-08-04"
  articles: Article[];
};
