# vienna-genai-spa-template

The single page application template for students.

> **⚠️ First-run setup (do this once): in your repo go to Settings → Pages and set Source to "GitHub Actions".** Without it your deployed page will be broken or unstyled. Full steps in [SETUP.md](SETUP.md).

## Local development

Step by step, the first time:

1. Open a terminal. On a Mac, press `Cmd + Space`, type `Terminal`, and press `Enter`.

2. Change into the folder you cloned, the one that contains `package.json`. For example, if it is on your Desktop:

   ```bash
   cd ~/Desktop/your-repo-name
   ```

3. Install the dependencies. You only need to do this once:

   ```bash
   npm install
   ```

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. The terminal prints a local address, usually `http://localhost:5173`. Open that address in your web browser. The page reloads automatically every time you save a file.

To stop the server, click back on the terminal and press `Ctrl + C`.

## API keys

This app calls two services, and needs a key for each before it returns anything:

1. **Financial Modeling Prep (price data):** paste your FMP key into `main.js`, on this line near the top:

   ```js
   const FMP_API_KEY = 'YOUR_FMP_KEY_HERE';
   ```

   Get a free key from your FMP dashboard at https://site.financialmodelingprep.com/.
2. **OpenRouter (the AI research note):** you enter this in the app's form field when you click Analyze. It is not stored in the code.

Note: `main.js` ships to the browser, so your FMP key is visible to anyone who views your deployed page. Use only a free classroom key here, never a paid or personal one.

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
