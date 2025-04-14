// server.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({ frameguard: false, xssFilter: false }));

// Custom headers for performance/security
app.use((req, res, next) => {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  res.removeHeader("X-XSS-Protection");
  next();
});

// Sample route (can be your Gemini API logic)
app.post("/api/gemini", async (req, res) => {
  const prompt = req.body.prompt;
  // Put your Gemini API logic here using @google/generative-ai
  res.json({ reply: "Gemini reply goes here" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
