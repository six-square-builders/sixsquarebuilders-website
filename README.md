# Six Square Builders – Construction & Real Estate Website

[![Live Site](https://img.shields.io/badge/Live-Site-blue?style=for-the-badge\&logo=google-chrome)](https://www.sixsquarebuilders.co.in)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge\&logo=github)](https://github.com/six-square-builders/sixsquarebuilders-website)

A modern, responsive, **Next.js-based static website** for showcasing residential and commercial projects by **Six Square Builders**.
The site features project details, enquiry forms, and seamless deployment via **GitHub Pages**, **Vercel**, or **Docker (NGINX)** — with no backend required.

---

## Overview

This website serves as a digital presence for **Six Square Builders**, displaying ongoing, upcoming, and completed projects with interactive modals and an in-modal enquiry form powered by **EmailJS**.

It is a **fully static frontend** built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, optimized for fast loading, accessibility, and responsive viewing across all devices.

---

## Features

* **Dynamic Projects Showcase**

  * Projects grid with categories: *Ongoing*, *Past*, and *Future*
  * Each project opens in a full-width responsive modal overlay
* **In-Modal Project Details**

  * Construction status, possession date, amenities, and sustainability highlights
  * Flat/unit details (area, facing, price range, etc.)
  * Downloadable legal and brochure documents
* **Enquiry Form (via EmailJS)**

  * Fields: name, email, phone, message, project_name (auto-filled)
  * Client-side validation with success/failure toasts
  * No backend — emails are sent directly through EmailJS SDK
* **Responsive UI**

  * Skeleton loading placeholders and lazy-loaded media
  * Accessible modals with focus trap and ARIA support
* **Static Hosting Compatibility**

  * Uses `public/projects.json` for static data
  * Works seamlessly on GitHub Pages, Netlify, and Vercel

---

## Technology Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript + React 19
* **Styling:** Tailwind CSS v4
* **Email Integration:** EmailJS (`@emailjs/browser`)
* **UI/UX Enhancements:** Sonner for notifications, accessibility-first modals
* **Deployment:** GitHub Actions → GitHub Pages / Dockerized via NGINX

---

## Local Development

1. **Install dependencies**

   ```bash
   npm ci
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

3. **Access the app**

   * Open [http://localhost:3000](http://localhost:3000)

---

## EmailJS Configuration (Required)

This site uses **EmailJS** for client-side enquiry form submissions (no backend).

1. Create an account: [https://www.emailjs.com/](https://www.emailjs.com/)
2. Add a new **Email Service** and **Template**
3. Define template variables:

   ```
   project_name
   name
   email
   phone
   message
   to_email
   ```
4. Copy these values from the EmailJS dashboard:

   * **Service ID**
   * **Template ID**
   * **Public Key**
5. Create a `.env.local` file in the project root:

   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

Used inside:
`src/app/projects/page.tsx` → `QuickInquiry` component.

---

## GitHub Pages Deployment (CI/CD)

This project includes an automated deployment workflow:

```
.github/workflows/deploy.yml
```

### Workflow summary:

* Triggers on push to `main`
* Executes:

  ```bash
  npm ci
  npm run build
  npm run export
  ```
* Deploys the `out/` directory using `peaceiris/actions-gh-pages@v3`

### Steps:

1. Push code to GitHub
2. Enable GitHub Pages under:

   ```
   Settings → Pages → Source: GitHub Actions
   ```
3. Push to `main` branch to trigger auto-deploy

For a **custom domain**, set `CNAME` to:

```
www.sixsquarebuilders.co.in
```

---

## Docker Deployment

This project is fully containerized for deployment on any Docker-compatible environment.

### Build and Run:

```bash
# Build image
docker build -t sixsquarebuilders .

# Run container
docker run --rm -p 3000:80 sixsquarebuilders
```

### Using Docker Compose:

```bash
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000)

### Key Files

| File                 | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `Dockerfile`         | Multi-stage build with NGINX serving the static export |
| `nginx.conf`         | SPA fallback configuration                             |
| `.dockerignore`      | Excludes unnecessary build artifacts                   |
| `docker-compose.yml` | Simplifies container build and run process             |

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx              → Home Page
│   │   ├── about/page.tsx        → About Page
│   │   ├── projects/page.tsx     → Projects grid + modal + enquiry form
│   │   ├── flats/page.tsx        → Flats listing page
│   │   └── contact/page.tsx      → Contact form
│   ├── components/               → Navbar, Footer, UI components
│   ├── hooks/                    → Custom React hooks
│   ├── visual-edits/             → Internal loader utilities
│   └── lib/                      → Reusable utilities and helpers
├── public/projects.json          → Static project data
├── next.config.ts                → Build configuration
├── Dockerfile, docker-compose.yml
├── nginx.conf, .dockerignore
├── .github/workflows/deploy.yml  → GitHub Actions CI/CD
└── README.md
```

---

## Accessibility & UX

* Semantic HTML and ARIA roles for modals
* Keyboard and screen reader support
* Focus trapping within modals
* Responsive grid layouts and adaptive design
* Lazy-loaded images and video previews

---

## Environment Variables

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

These are exposed on the client for EmailJS integration.

---

## Scripts

| Command          | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `npm run dev`    | Start local development server                                  |
| `npm run build`  | Build Next.js app                                               |
| `npm run export` | Export static site to `/out`                                    |
| `npm run lint`   | Run ESLint checks                                               |
| `npm run start`  | Run Next.js production server (not required for static hosting) |

---

## Troubleshooting

| Issue                           | Possible Cause              | Solution                                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------------------- |
| CSS not loading on GitHub Pages | Base path misconfigured     | Verify `basePath` and `assetPrefix` in `next.config.ts`       |
| Email not sending               | Invalid EmailJS credentials | Recheck `.env.local` and EmailJS dashboard                    |
| 404 on GitHub Pages refresh     | SPA fallback missing        | Ensure correct `output: "export"` and `nginx.conf` for Docker |

---

## License

This project is licensed under the **MIT License**.
© 2025 Six Square Builders. All rights reserved.


