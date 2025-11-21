const OpenAI = require("openai");

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No request body received." })
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON body." })
      };
    }

    if (!body.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'message' field." })
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",   // cheapest working model
      input: body.message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.output_text
      })
    };

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Something went wrong on the server.",
        details: err.message
      })
    };
  }
};
