import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchCV, updateCV } from "../api/cv";

export default function EditCV() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCV = async () => {
      try {
        const cv = await fetchCV(id, token);
        setTitle(cv.title);
        setContent(cv.content);
      } catch (error) {
        console.error("Failed to fetch CV:", error);
        navigate("/dashboard");
      }
    };
    loadCV();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCV(id, { title, content }, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update CV:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit CV</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded h-64"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update CV
        </button>
      </form>
    </div>
  );
}
