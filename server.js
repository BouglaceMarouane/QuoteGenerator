const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Fallback quotes for when the API is rate limited
const fallbackQuotes = [
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { q: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" },
  { q: "Life is what happens to you while you're busy making other plans.", a: "John Lennon" },
  { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
  { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
  { q: "The way to get started is to quit talking and begin doing.", a: "Walt Disney" },
  { q: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", a: "Roy T. Bennett" },
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" }
];

// Simple rate limiting - track last request time
let lastRequestTime = 0;
const RATE_LIMIT_MS = 2000; // 2 seconds between requests

app.get('/api/quote', async (req, res) => {
  try {
    const now = Date.now();
    
    // Check if we're making requests too frequently
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      console.log('Rate limiting: Using fallback quote');
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return res.json([randomQuote]);
    }
    
    lastRequestTime = now;
    
    const response = await fetch('https://zenquotes.io/api/random');
    console.log('ZenQuotes response status:', response.status);
    
    if (!response.ok) {
      if (response.status === 429) {
        console.log('Rate limited by ZenQuotes API, using fallback quote');
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        return res.json([randomQuote]);
      }
      
      const text = await response.text();
      console.error('ZenQuotes error response:', text);
      // Use fallback instead of returning error
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return res.json([randomQuote]);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    // Use fallback instead of returning error
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json([randomQuote]);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});