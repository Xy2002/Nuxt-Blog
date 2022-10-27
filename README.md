# Nuxt Blog

A document-driven blog based on Nuxt & Nuxt Content  
![License](https://img.shields.io/github/license/Xy2002/Nuxt-Blog)

## Feature

-   Automatically generate article directories up to three levels based on `Content` directories
-   Flexible configuration, configure `app.config.ts` to customize the navigation bar
-   Special Code display component, highlighting is based on `Shiki` for packaging, Shiki will load themes and rules from local, more friendly for Chinese users
-   The content style is taken from Notion and modified on the basis of Notion to look more comfortable

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## To Do List

-   Dark mode
-   Responsive layout
-   Search in the site
-   Toc
