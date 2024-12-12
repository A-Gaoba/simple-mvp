const { GoogleGenerativeAI } = require("@google/generative-ai");
const CV = require("../models/CV");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateContent = async (req, res) => {
  try {
    const { cvId, prompt } = req.body;

    const cv = await CV.findOne({ _id: cvId, user: req.user.id });
    if (!cv) return res.status(404).json({ message: "CV not found" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`
      Based on the following CV:
      ${cv.content}

      Create a concise, engaging, and highly tailored cover letter or proposal that directly aligns the candidate's skills and experience with the job described below:
      ${prompt}
    `);

    const generatedContent = result.response.text();

    res.json({ generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
