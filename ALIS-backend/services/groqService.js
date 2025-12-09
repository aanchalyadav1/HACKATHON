// ALIS-backend/services/groqService.js
import fetch from "node-fetch";

export async function groqChat(message) {
  try {
    // MODEL CHOICE: mixtral-8x7b-32768 is robust; change if your Groq console recommends another
    const model = process.env.GROQ_MODEL || "mixtral-8x7b-32768";

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are ALIS — a concise, professional Indian loan underwriting assistant." },
          { role: "user", content: message }
        ],
        temperature: 0.3,
        max_tokens: 400
      })
    });

    const data = await resp.json();
    console.log("🔵 GROQ RAW RESPONSE:", JSON.stringify(data));

    if (data?.error) {
      console.error("Groq returned error:", data.error);
      return `Groq error: ${data.error.message || "unknown"}`;
    }

    // extract reply safely
    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.delta?.content ||
      (typeof data === "string" ? data : null);

    return reply || "No response";
  } catch (err) {
    console.error("GroqChat Error:", err);
    return "Error contacting Groq.";
  }
}
