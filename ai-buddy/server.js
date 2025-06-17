import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";

const app = express();
const PORT = 4000;

// Serve static files from public folder
app.use(express.static(path.join(process.cwd(), "public")));

app.use(cors());
app.use(express.json());

// Default route - serve landing.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "landing.html"));
});

// Example AI chat endpoint (adjust to your AI backend)
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    // Replace with your actual AI API call if needed
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
