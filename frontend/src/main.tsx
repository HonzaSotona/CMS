import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AdminPageCreate } from './pages/admin/AdminPageCreate';
import { AdminPageEdit } from './pages/admin/AdminPageEdit';
import { AdminPagesList } from './pages/admin/AdminPagesList';
import { PublicPage } from './pages/public/PublicPage';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/admin/pages',
        element: <AdminPagesList />,
      },
      {
        path: '/admin/pages/new',
        element: <AdminPageCreate />,
      },
      {
        path: '/admin/pages/:id/edit',
        element: <AdminPageEdit />,
      },
      {
        path: '/:slug',
        element: <PublicPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
