# Skyline Constructions – Frontend-Only App (Next.js)

A static React app for showcasing construction projects with a full-width Project Details modal and an in-modal enquiry form that sends emails via EmailJS — no backend required. Deployable to GitHub Pages, Netlify, Vercel, or as a Docker container.

## Features
- Projects grid with tabs (Ongoing, Past, Future)
- Click any project to open a full-width, responsive modal overlay
- Modal includes:
  - Project Overview (address, media gallery, landmarks, Google Map embed)
  - Construction Status (stage, progress, possession date)
  - Flat/Unit Details (areas, facing, balconies, floorplans)
  - Pricing & Payment (all-inclusive example, bank approvals, schedule, EMI calculator)
  - Amenities, Specifications, Sustainability
  - Developer & Legal info with downloadable docs
  - Social Proof (testimonials/awards)
  - Lead capture: Book a Site Visit, Request Callback, and Quick Inquiry form
- Enquiry Form (inside modal):
  - Fields: name, email, phone, message, and hidden project_name (auto-filled)
  - Client-side validation (required, email format, phone format)
  - EmailJS client-side email to myaddress@example.com
  - Toasts: success and failure (with Retry)
  - No page reloads
- UX:
  - Skeletons with grey shimmer while modal content loads
  - Submit button disabled with spinner during send
  - Responsive, keyboard accessible, ARIA labels, focus trap
  - Lazy-loaded images and video preload=metadata
- Static hosting friendly:
  - Uses `public/projects.json` for data on static hosts
  - Falls back to `/api/projects` when available

## Tech
- Next.js 15 (App Router) + React 19
- Tailwind CSS v4
- EmailJS client SDK (`@emailjs/browser`)
- Sonner toasts
- Deployed with GitHub Actions to GitHub Pages (static export)
- Dockerized with NGINX serving the static export

## Local Development
1. Install dependencies
   - npm: `npm ci`
2. Run dev server
   - `npm run dev`
3. Open http://localhost:3000

Data for the modal is in `public/projects.json`.

## EmailJS Configuration (Required for Enquiry Emails)
The in-modal enquiry uses EmailJS on the client — no backend.

1. Create an account: https://www.emailjs.com/
2. Add an Email Service and a Template. In the template, define the following variables:
   - `project_name`
   - `name`
   - `email`
   - `phone`
   - `message`
   - `to_email` (set default to `myaddress@example.com` or map in the UI)
3. In EmailJS dashboard, copy:
   - Service ID
   - Template ID
   - Public Key
4. Create a `.env.local` file in the project root with:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key`
5. Restart `npm run dev`.

Where it's used: `src/app/projects/page.tsx` in the `QuickInquiry` component.

## GitHub Pages Deployment (CI/CD)
This repository includes a GitHub Actions workflow: `.github/workflows/deploy.yml`

It:
- Runs on pushes to `main`
- Executes: `npm ci`, `npm run build`, `npm run export`
- Uploads the `out/` folder and deploys to Pages with `actions/deploy-pages`

Steps:
1. Push your code to a GitHub repo.
2. Ensure Pages is enabled (Settings → Pages → Source: GitHub Actions).
3. Push to `main` to trigger the workflow.

Note: For project pages (username.github.io/repo), you may need to configure a custom domain or ensure paths work. This app uses static export and root-relative paths for public assets and `public/projects.json`.

## Netlify / Vercel
- Netlify: set build command `npm run build && npm run export` and publish directory `out/`.
- Vercel: You can deploy the Next app directly without export; the app also includes API routes for dynamic testing.

## Docker
This repo includes a multi-stage Dockerfile that builds and serves the static export using NGINX.

Build and run:
```bash
# Build
docker build -t skyline-app .

# Run (serves on port 3000)
docker run --rm -p 3000:80 skyline-app
# Open http://localhost:3000
```

Using docker-compose:
```bash
docker-compose up --build
# Open http://localhost:3000
```

Key files:
- `Dockerfile`: builds Next.js, runs `next export`, serves with NGINX
- `nginx.conf`: SPA fallback to `/index.html`
- `.dockerignore`: excludes node_modules, build artifacts, etc.

## Project Structure
- `src/app/projects/page.tsx` — Projects grid + modal + enquiry (EmailJS)
- `public/projects.json` — Static data for modal
- `.github/workflows/deploy.yml` — GitHub Pages CI
- `Dockerfile`, `nginx.conf`, `.dockerignore`, `docker-compose.yml` — Containerization

## Accessibility & UX
- Modal uses `role="dialog"`, `aria-modal="true"`, labelled by title and description
- Keyboard focus trap within the modal
- Backdrop click and mobile swipe-down to close
- Skeleton placeholders while loading
- Lazy-loaded images and video metadata preload

## Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

These are read on the client.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — Next.js build
- `npm run export` — static export to `out/`
- `npm run start` — Next.js server (not needed for static hosting)
- `npm run lint` — lint

## Troubleshooting
- Email not sending: verify EmailJS keys and template variables; check browser console for errors.
- Blank modal data on static hosts: ensure `public/projects.json` is deployed and accessible; the app fetches this first for static hosting.
- GitHub Pages 404 on refresh: static export + SPA fallback is handled by our Docker NGINX. For Pages, GitHub handles static file serving; avoid deep-linking to dynamic routes.

## License
MIT