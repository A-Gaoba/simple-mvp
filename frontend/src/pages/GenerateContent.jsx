import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchCV } from "../api/cv";
import { generateContent } from "../api/content";

export default function GenerateContent() {
  const [cv, setCV] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const loadCV = async () => {
      try {
        const fetchedCV = await fetchCV(id, token);
        setCV(fetchedCV);
      } catch (error) {
        console.error("Failed to fetch CV:", error);
      }
    };
    loadCV();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await generateContent(id, prompt, token);
      setGeneratedContent(content);
    } catch (error) {
      console.error("Failed to generate content:", error);
    }
  };

  if (!cv) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Generate Content for {cv.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block mb-1">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded h-32"
            placeholder="Enter your prompt for content generation..."
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate Content
        </button>
      </form>
      {generatedContent && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Generated Content:</h3>
          <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
}
