import { useNavigate } from 'react-router-dom';
import { pagesApi } from '../../api/pages';
import { PageForm } from '../../components/PageForm';
import type { PagePayload } from '../../types/page';

export function AdminPageCreate(): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = async (payload: PagePayload) => {
    await pagesApi.createAdmin(payload);
    navigate('/admin/pages');
  };

  return (
    <section>
      <h2>Nová stránka</h2>
      <PageForm onSubmit={handleSubmit} />
    </section>
  );
}
