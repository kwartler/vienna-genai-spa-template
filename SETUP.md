# Setup

Follow this once after you create your repo from this template. It takes about two minutes.

## 1. Turn on GitHub Pages (required, once per repo)

1. Go to your repository on GitHub.
2. Click **Settings** (top menu).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.

That is the whole setup. You do **not** need to pick a branch or folder.

> **Why this matters:** if Source is left on "Deploy from a branch," GitHub serves your raw files instead of the built site. The page loads without styling and the app does not work. Setting Source to "GitHub Actions" tells GitHub to publish what the build produces.

> **Note:** this setting does not carry over when you generate a new repo from this template. Every student, in every repo, has to do this once.

## 2. Add your API keys

The app needs two keys before it will return anything.

1. **Financial Modeling Prep (price data).** Open `main.js` and paste your FMP key into this line near the top:

   ```js
   const FMP_API_KEY = 'YOUR_FMP_KEY_HERE';
   ```

   Get a free key from your FMP dashboard at https://site.financialmodelingprep.com/.

2. **OpenRouter (the AI research note).** You do not put this in the code. Type it into the app's "OpenRouter API key" field when you click Analyze.

> **Heads up:** `main.js` is sent to the browser, so your FMP key is visible to anyone who opens your deployed page. Use only a free classroom key here, never a paid or personal one.

## 3. Deploy

Every push to `main` builds and redeploys automatically. No tags or version numbers.

```bash
git add .
git commit -m "your change"
git push
```

Wait about a minute, then open:

```
https://<your-username>.github.io/<your-repo-name>/
```

You can watch the build in the **Actions** tab, and trigger a manual redeploy there too (Build and Deploy → "Run workflow").

## 4. Run it locally (optional, while you build)

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173` and reloads on every edit.

## Troubleshooting

- **"Something went wrong: Invalid API KEY":** your FMP key in `main.js` is missing or still `YOUR_FMP_KEY_HERE`. Redo step 2.
- **Page has no styling / app does nothing when deployed** — Source is probably still "Deploy from a branch." Redo step 1.
- **Nothing deploys after a push** — check the **Actions** tab for a failed run, and confirm you pushed to the `main` branch.
- **404 at the Pages URL** — the first deploy may still be running, or Pages is not enabled yet (step 1). Give it a minute, then refresh.
- **Assets 404 (`style.css` / `main.js` not found)** — do not change the asset paths in `index.html` to start with a leading `/`. They must stay relative (`./style.css`, `./main.js`) so they resolve under the `/<repo-name>/` subpath.
