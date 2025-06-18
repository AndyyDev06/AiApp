import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// This fixes __dirname for ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files correctly regardless of where node is run
app.use(express.static(path.join(__dirname, "public")));

// Default route:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const response = await axios.post(
      "http://localhost:11434/api/chat",
      { model: "ollama", prompt },
      { timeout: 30000 }
    );

    if (response.data?.choices?.length > 0) {
      res.json({ response: response.data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from AI" });
    }
  } catch (err) {
    console.error("Ollama API error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
