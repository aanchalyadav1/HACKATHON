import fetch from "node-fetch";

export async function groqChat(message) {
  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",   // ✅ correct model
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await resp.json();

    console.log("🔵 GROQ RAW RESPONSE:", JSON.stringify(data, null, 2));

    if (data?.error) {
      return `Groq error: ${data.error.message}`;
    }

    return data?.choices?.[0]?.message?.content || "No response from model";
  } catch (err) {
    console.error("GroqChat Error:", err);
    return "Internal server error calling Groq";
  }
}
