import OpenAI from "openai";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      messages: [
        { role: "system", content: "You are KaenenGPT, a helpful AI." },
        { role: "user", content: body.message }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: completion.choices[0].message.content
      })
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." })
    };
  }
}