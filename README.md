# vienna-genai-spa-template

The single page application template for students.

> **⚠️ First-run setup (do this once): in your repo go to Settings → Pages and set Source to "GitHub Actions".** Without it your deployed page will be broken or unstyled. Full steps in [SETUP.md](SETUP.md).

## Local development

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173`. Edits reload automatically.

## Deploying to GitHub Pages

Every push to `main` builds the app and redeploys it automatically. No tags or version bumps needed.

```bash
git add .
git commit -m "your change"
git push
```

The site goes live at `https://<your-username>.github.io/<your-repo-name>/` about a minute later. You can also trigger a redeploy manually from the repo's **Actions** tab (Build and Deploy, "Run workflow").

### One-time setup (do this once per repo)

In your repo on GitHub: **Settings, then Pages, then set Source to "GitHub Actions".**

If Source is left on "Deploy from a branch," the build runs but its output is ignored and you will see a broken or unstyled page.

## Notes

- Asset paths in `index.html` are relative (`./style.css`, `./main.js`) and `vite.config.js` sets `base: './'`. This is what makes the site work under the `/<repo-name>/` subpath that GitHub Pages uses. Do not change these to start with a leading `/`.
