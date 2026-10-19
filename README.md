# Manzi Delphin — Software Engineering Portfolio

A responsive, dark-premium personal portfolio built with **Next.js 14**, **React**, **TypeScript**, and custom CSS. Designed for deployment to **Vercel's free Hobby plan**.

## Features

- Responsive navigation and mobile menu
- About, selected projects, experience, education, skills, and contact sections
- Live project and GitHub links
- Downloadable CV at `/Manzi_Delphin_CV.pdf`
- Accessible buttons, descriptive labels, and reduced-motion support
- No API keys, database, or environment variables needed

## Run locally

Requires Node.js 18.17+ (Node.js 20 or 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Create a new **public or private GitHub repository** and upload this project's files.
2. Visit https://vercel.com/new and import the repository.
3. Keep **Framework Preset: Next.js** and **Root Directory: `./`**.
4. Click **Deploy**. Vercel will assign a free `*.vercel.app` URL.
5. Later GitHub pushes will trigger new deployments automatically.

No environment variables are required.

## Customize

- Edit `app/page.tsx` to update text, projects, links, and skills.
- Edit `app/globals.css` to adjust the design and colors.
- Replace `public/Manzi_Delphin_CV.pdf` with the latest CV.
- Update `app/layout.tsx` for SEO and social sharing metadata.
- The internship projects have no public code links because they were developed during employment. Add public demos only if you have permission.

## Notes

- The portfolio describes project capabilities based on the supplied CV; verify all claims and project URLs before sharing it with recruiters.
- The hero uses a **CSS/code illustration**, not a personal photo; add your own portrait if desired.
- Google Fonts are imported in CSS; the site falls back to system fonts if they are unavailable.
- There is no contact-form backend: the contact button opens your email application.

© Manzi Delphin
