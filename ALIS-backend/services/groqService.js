import fetch from "node-fetch";

export async function groqChat(userMessage) {
  try {
    const systemPrompt = `
You are ALIS — a professional Indian loan-underwriting assistant.
You ALWAYS reply in short, clean, structured bullet points.

RULES:
- Max 4–6 bullet points per answer.
- Avoid long paragraphs.
- Keep answers crisp and actionable.
- Tone must be professional & simple.
- Do NOT give global loan info, only India-focused.
- If user asks something unclear, ask for EXACT information, but briefly.

FORMAT:
**Title**
- point
- point
- point
    `;

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 350,
        temperature: 0.4
      })
    });

    const data = await resp.json();
    return data?.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.error("Groq error:", err);
    return "Something went wrong. Please try again.";
  }
}
