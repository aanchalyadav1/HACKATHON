// services/groqService.js
import fetch from "node-fetch";

export async function groqChat(message) {
  const API_KEY = process.env.GROQ_API_KEY;
  const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"; // safe free-tier
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  if (!API_KEY) {
    return "Groq Error: Missing GROQ_API_KEY";
  }

  try {
    const payload = {
      model: MODEL,
      messages: [{ role: "user", content: message }]
    };

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();

    console.log("🔵 GROQ RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return "Groq Error: Invalid JSON response";
    }

    if (data.error) {
      console.error("Groq error:", data.error.message);
      return `Groq Error: ${data.error.message}`;
    }

    const content = data?.choices?.[0]?.message?.content;
    return content || "No response";
  } catch (err) {
    console.error("Groq exception:", err);
    return "Groq Error: Network issue";
  }
}
