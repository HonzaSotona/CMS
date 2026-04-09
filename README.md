# Custom CMS (Laravel + React)

Monorepo pro jednoduchý CMS systém ve stylu WordPressu:
- **Laravel API backend** (`/backend`) pro správu stránek, publikaci a veřejné endpointy.
- **React frontend** (`/frontend`) pro administrační rozhraní i render veřejných stránek podle `slug`.

## Funkce MVP
- CRUD pro stránky (admin API)
- Draft/Published status
- SEO metadata (`meta_title`, `meta_description`)
- Veřejný endpoint pro publikované stránky
- React admin (seznam, vytvoření, editace, mazání)
- React public stránka `/:slug`

## 1) Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### API trasy
- `GET /api/admin/pages` (auth:sanctum)
- `POST /api/admin/pages` (auth:sanctum)
- `GET /api/admin/pages/{page}` (auth:sanctum)
- `PUT /api/admin/pages/{page}` (auth:sanctum)
- `DELETE /api/admin/pages/{page}` (auth:sanctum)
- `GET /api/pages/{slug}` (public)

> Pro admin endpointy je připraven middleware `auth:sanctum`.

## 2) Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Volitelně nastav API URL:

```bash
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

## 3) Datový model stránek

Tabulka `pages`:
- `title` (string)
- `slug` (unique)
- `content` (json pole bloků)
- `status` (`draft` / `published`)
- `meta_title`, `meta_description`

Obsah je uložen jako jednoduché pole bloků:

```json
[
  { "type": "heading", "value": "Nadpis" },
  { "type": "paragraph", "value": "Text odstavce" }
]
```

## 4) Co doplnit jako další krok
- Přihlášení/registrace uživatelů + role (admin/editor)
- Upload obrázků (media library)
- Historie verzí stránek (revisions)
- Pokročilý blokový editor (Tiptap/Editor.js)
