const OpenAI = require("openai");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5.1-mini",
      input: body.message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.output_text
      })
    };

  } catch (err) {
    console.error("FUNCTION ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || String(err),
        stack: err.stack || "no stack"
      })
    };
  }
};
