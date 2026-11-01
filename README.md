# Plain microfrontend sample (React + TypeScript)

Three tiny apps, plain HTML, no CSS:

- `apps/host` (3000): the page. Loads Header and Content, and has its own footer.
- `apps/header` (3001): exposes `Header`.
- `apps/content` (3002): exposes `Content`.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To change the data, edit the `<ul>` in `apps/content/src/Content.tsx`.
