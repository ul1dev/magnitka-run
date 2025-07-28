# Next.js + Tailwind CSS + SCSS Template (TypeScript)

This repository contains a minimal setup for a Next.js project configured with Tailwind CSS, SCSS modules, and TypeScript. It includes two example pages: `index` and `second`.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – build the application for production
- `npm start` – start the production server

## Project Structure

```
/pages
  |_ _app.tsx           # Global styles import
  |_ index.tsx          # Home page
  |_ second.tsx         # Second page
/styles
  |_ globals.scss       # Tailwind directives and global styles
  |_ Home.module.scss   # Styles for the home page
  |_ Second.module.scss # Styles for the second page
```

TailwindCSS directives are placed inside `styles/globals.scss`. Each page imports its own SCSS module for styling.

TypeScript settings are defined in `tsconfig.json` which is included in the project root.
