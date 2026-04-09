import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pagesApi } from '../../api/pages';
import type { PageRecord } from '../../types/page';

export function PublicPage(): JSX.Element {
  const params = useParams();
  const [page, setPage] = useState<PageRecord | null>(null);

  useEffect(() => {
    const slug = params.slug ?? 'home';
    void pagesApi.getPublic(slug).then(setPage);
  }, [params.slug]);

  if (!page) {
    return <p>Načítám stránku...</p>;
  }

  return (
    <article>
      <h2>{page.title}</h2>
      {page.content.map((block, index) => {
        if (block.type === 'heading') {
          return <h3 key={index}>{block.value}</h3>;
        }

        return <p key={index}>{block.value}</p>;
      })}
    </article>
  );
}
