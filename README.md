## Growing Up in Science website

This repository contains the Gatsby site for Growing Up in Science (GUIS).

## Tech stack
- **Framework**: Gatsby 5 (React 18)
- **Styling**: Plain CSS in `src/css`
- **Content**: Markdown via `gatsby-transformer-remark`
- **Hosting/Deploy**: Firebase Hosting

## Project structure

- `src/pages/`
  - `index.js`, `events.js`, `stories.js`, `404.js`
  - `{MarkdownRemark.frontmatter__slug}.js` template renders Markdown content from `src/markdown-pages`
- `src/markdown-pages/`
  - `events/`: Event markdown files (each file becomes a page)
  - `stories/`: Story markdown files
  - `chapters.md`, `participate.md`: Top-level content pages
- `src/components/`: Reusable UI components (e.g., `layout.js`, `menu.js`)
- `src/css/`: Stylesheets (`style.css`, `mobile.css`)
- `src/images/`: Static images and icons
- `public/`: Gatsby build output (committed here for hosting)
- `gatsby-config.js`: Gatsby configuration and plugins
- `firebase.json`: Firebase Hosting configuration

## Scripts

```shell
# install dependencies
npm install --force

# start local development server (http://localhost:8000)
npm run develop

# production build into ./public
npm run build

# serve the production build locally
npm run serve

# deploy (builds, then deploys to Firebase Hosting)
npm run deploy
```

## Content authoring

- Add new stories under `src/markdown-pages/stories/`.
- Add new events under `src/markdown-pages/events/`.
- Frontmatter must include `slug`, `title`, and relevant metadata used by templates.

## Common tasks

- **Update browserslist data** (when warned during builds):
  ```shell
  npx update-browserslist-db@latest --yes
  ```

## Deployment

- Local deploy: `npm run deploy` (runs `gatsby build` then `firebase deploy --only hosting`).
- CI: GitHub Actions may deploy automatically if configured.

## License

Copyright © Growing Up in Science.
