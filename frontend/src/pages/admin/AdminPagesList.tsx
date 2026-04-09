import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pagesApi } from '../../api/pages';
import type { PageRecord } from '../../types/page';

export function AdminPagesList(): JSX.Element {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<PageRecord[]>([]);

  const loadPages = async () => {
    const data = await pagesApi.listAdmin(search);
    setPages(data);
  };

  useEffect(() => {
    void loadPages();
  }, []);

  return (
    <section>
      <h2>Správa stránek</h2>
      <div className="inline-actions">
        <input
          placeholder="Hledat podle názvu nebo slug"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="button" onClick={() => void loadPages()}>
          Hledat
        </button>
        <Link to="/admin/pages/new">+ Nová stránka</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulek</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>{page.id}</td>
              <td>{page.title}</td>
              <td>{page.slug}</td>
              <td>{page.status}</td>
              <td>
                <Link to={`/admin/pages/${page.id}/edit`}>Editovat</Link>{' '}
                <button
                  type="button"
                  onClick={async () => {
                    await pagesApi.deleteAdmin(page.id);
                    await loadPages();
                  }}
                >
                  Smazat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
