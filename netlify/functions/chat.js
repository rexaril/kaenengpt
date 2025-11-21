import OpenAI from "openai";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: body.message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.output_text
      })
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Something went wrong on the server." 
      })
    };
  }
}
