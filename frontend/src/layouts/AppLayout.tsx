import { Link, Outlet } from 'react-router-dom';

export function AppLayout(): JSX.Element {
  return (
    <div className="container">
      <header>
        <h1>Custom CMS</h1>
        <nav>
          <Link to="/admin/pages">Admin stránky</Link> | <Link to="/">Domů</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
