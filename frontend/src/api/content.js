import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const generateContent = async (cvId, prompt, token) => {
  const response = await axios.post(
    `${API_URL}/content/generate`,
    { cvId, prompt },
    {
      headers: { "x-auth-token": token },
    }
  );
  return response.data.generatedContent;
};
