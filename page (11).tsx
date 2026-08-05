"use client";

// Barra de pesquisa dentro do diploma.
// Trabalha sobre o DOM já renderizado pelo servidor — o texto integral está
// sempre presente no HTML, mesmo com o JavaScript desligado; a pesquisa apenas
// oculta os artigos que não correspondem, sem os remover do documento.

import { useCallback, useRef, useState } from "react";

const normalise = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type Indexed = { wrapper: HTMLElement; haystack: string };

export function ReaderTools({ total }: { total: number }) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState(total);
  const indexRef = useRef<Indexed[] | null>(null);

  // Indexa os artigos na primeira pesquisa, a partir do DOM renderizado.
  const getIndex = useCallback((): Indexed[] => {
    if (indexRef.current) return indexRef.current;
    const built = Array.from(document.querySelectorAll<HTMLElement>("[data-article]")).map((element) => ({
      // O invólucro inclui os cabeçalhos de divisão (TÍTULO/CAPÍTULO) do artigo.
      wrapper: (element.parentElement ?? element) as HTMLElement,
      haystack: normalise(`${element.dataset.label ?? ""} ${element.textContent ?? ""}`),
    }));
    indexRef.current = built;
    return built;
  }, []);

  // O filtro corre no manipulador do evento, não num efeito: evita renderizações
  // em cascata e mantém a escrita no DOM fora do ciclo de renderização do React.
  const applyFilter = useCallback(
    (value: string) => {
      setQuery(value);
      const term = normalise(value.trim());
      let visible = 0;
      for (const entry of getIndex()) {
        const hit = !term || entry.haystack.includes(term);
        entry.wrapper.hidden = !hit;
        if (hit) visible += 1;
      }
      setMatches(term ? visible : total);
    },
    [getIndex, total],
  );

  return (
    <div className="reader-tools" role="search">
      <div className="search-shell reader-search">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          value={query}
          onChange={(event) => applyFilter(event.target.value)}
          placeholder="Pesquisar artigo, epígrafe ou expressão neste diploma…"
          aria-label="Pesquisar dentro do diploma"
        />
        {query && <button onClick={() => applyFilter("")} aria-label="Limpar pesquisa">Limpar</button>}
      </div>
      <div className="reader-tools-side">
        <span className="reader-count" aria-live="polite">
          {query ? `${matches} de ${total} artigos` : `${total} artigos`}
        </span>
        <button className="print-button" onClick={() => window.print()}>Imprimir / PDF</button>
      </div>
    </div>
  );
}
