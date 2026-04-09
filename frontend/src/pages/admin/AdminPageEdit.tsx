import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pagesApi } from '../../api/pages';
import { PageForm } from '../../components/PageForm';
import type { PagePayload, PageRecord } from '../../types/page';

export function AdminPageEdit(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState<PageRecord | null>(null);

  useEffect(() => {
    const id = Number(params.id);

    if (!Number.isNaN(id)) {
      void pagesApi.getAdmin(id).then(setPage);
    }
  }, [params.id]);

  const handleSubmit = async (payload: PagePayload) => {
    const id = Number(params.id);
    await pagesApi.updateAdmin(id, payload);
    navigate('/admin/pages');
  };

  if (!page) {
    return <p>Načítám...</p>;
  }

  return (
    <section>
      <h2>Editace stránky</h2>
      <PageForm initialValue={page} onSubmit={handleSubmit} />
    </section>
  );
}
