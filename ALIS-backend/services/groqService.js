import fetch from 'node-fetch';

export async function groqChat(message) {
  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await resp.json();

    console.log("🔵 GROQ RAW RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.delta?.content ||
      "Something went wrong";

    return reply;

  } catch (err) {
    console.error("Groq error:", err);
    return "Groq API Error";
  }
}
