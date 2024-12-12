const CV = require("../models/CV");
const { generateLLMContent } = require("../utils/generateLLMContent");

exports.generateContent = async (req, res) => {
  try {
    const { cvId, prompt } = req.body;

    // Fetch CV from the database
    const cv = await CV.findOne({ _id: cvId, user: req.user.id });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Format the prompt
    const formattedPrompt = `
      Based on the following CV:
      ${cv.content}

      Create a concise, engaging, and highly tailored cover letter or proposal that directly aligns the candidate's skills and experience with the job described below:
      ${prompt}
    `;

    // Generate content using the helper function
    const generatedContent = await generateLLMContent(formattedPrompt);

    if (!generatedContent) {
      return res.status(500).json({ message: "Failed to generate content" });
    }

    res.json({ generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
