// Vienna GenAI Finance course, starter scaffold.
// This file intentionally does very little. Build on it during class.

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

// Example: unauthenticated Yahoo Finance price fetch.
// Replace or extend with moving average, MACD, RSI calculations from Day 1.
async function fetchPriceData(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=3mo&interval=1d`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Price fetch failed');
  return response.json();
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
  results.innerHTML = `
    <h2>${ticker}</h2>
    <p class="note">${note}</p>
  `;
}
