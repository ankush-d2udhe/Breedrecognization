const testApi = async () => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI farming assistant.",
          },
          { role: "user", content: "Hello" },
        ],
      }),
    });

    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

testApi();