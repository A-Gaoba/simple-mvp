const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function generateLLMContent(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text();
    return output;
  } catch (error) {
    console.error(error);
  }
}
