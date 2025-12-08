import fetch from "node-fetch";

export async function groqChat(message) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3.1-8b-instant",
        messages: [
          { role: "system", content: "You are ALIS, an AI loan assistant." },
          { role: "user", content: message }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    console.log("GROQ RAW RESPONSE:", data);

    if (data.error) {
      return "Groq API error: " + data.error.message;
    }

    return data.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    console.error("GroqChat Error:", err);
    return "Error contacting Groq.";
  }
}
