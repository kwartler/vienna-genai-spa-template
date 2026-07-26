// Vienna GenAI Finance course, starter scaffold.
// This file intentionally does very little. Build on it during class.

// Paste your Financial Modeling Prep API key between the quotes below.
// Get a free key at https://site.financialmodelingprep.com/ (Dashboard).
// Note: this key is visible in the browser, so only use a free/classroom key here.
const FMP_API_KEY = 'YOUR_FMP_KEY_HERE';

const form = document.getElementById('ticker-form');
const results = document.getElementById('results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const ticker = document.getElementById('ticker').value.trim().toUpperCase();
  const openRouterKey = document.getElementById('openrouter-key').value.trim();

  results.innerHTML = '<p>Loading...</p>';

  try {
    const priceData = await fetchPriceData(ticker);
    const note = await getResearchNote(ticker, priceData, openRouterKey);
    renderResults(ticker, priceData, note);
  } catch (err) {
    results.innerHTML = `<p class="error">Something went wrong: ${err.message}</p>`;
  }
});

// Financial Modeling Prep daily price history (last 3 months).
// This endpoint sends CORS headers, so it works directly from the browser.
// Returns an array of daily bars: { date, open, high, low, close, volume }.
// Replace or extend with moving average, MACD, RSI calculations from Day 1.
async function fetchPriceData(ticker) {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 3);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const url = `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${ticker}&from=${fmt(from)}&to=${fmt(to)}&apikey=${FMP_API_KEY}`;
  const response = await fetch(url);

  const raw = await response.json();
  // FMP reports key/plan problems as { "Error Message": "..." }.
  if (raw && raw['Error Message']) throw new Error(raw['Error Message']);
  if (!response.ok) throw new Error('Price fetch failed');

  // The stable endpoint returns a bare array; older paths nest it under `historical`.
  const bars = Array.isArray(raw) ? raw : (raw.historical ?? []);
  if (!bars.length) throw new Error(`No price data returned for ${ticker}`);
  return bars;
}

// Example: OpenRouter call. Replace the model, prompt, and system prompt
// with whatever you designed in the Prompt Engineering session.
async function getResearchNote(ticker, priceData, apiKey) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-6',
      messages: [
        { role: 'system', content: 'You are a financial research assistant. Be concise and factual.' },
        { role: 'user', content: `Give a one paragraph research note for ${ticker}.` }
      ]
    })
  });
  if (!response.ok) throw new Error('OpenRouter call failed');
  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'No response.';
}

function renderResults(ticker, priceData, note) {
  // priceData is the array of daily bars from fetchPriceData.
  // Grab the most recent bar so you can confirm the data actually loaded.
  const latest = priceData.reduce((a, b) => (a.date > b.date ? a : b));

  results.innerHTML = `
    <h2>${ticker}</h2>
    <p class="price">Latest close (${latest.date}): $${Number(latest.close).toFixed(2)}</p>
    <p class="note">${note}</p>
  `;
}
