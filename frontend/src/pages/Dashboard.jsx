import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchCVs, deleteCV } from "../api/cv";

export default function Dashboard() {
  const [cvs, setCVs] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const fetchedCVs = await fetchCVs(token);
        setCVs(fetchedCVs);
      } catch (error) {
        console.error("Failed to fetch CVs:", error);
      }
    };
    loadCVs();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteCV(id, token);
      setCVs(cvs.filter((cv) => cv._id !== id));
    } catch (error) {
      console.error("Failed to delete CV:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your CVs</h2>
      {cvs.length === 0 ? (
        <p>You haven`&apos;t created any CVs yet.</p>
      ) : (
        <ul className="space-y-4">
          {cvs.map((cv) => (
            <li
              key={cv._id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <span className="text-lg font-medium">{cv.title}</span>
              <div className="space-x-2">
                <Link
                  to={`/edit-cv/${cv._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <Link
                  to={`/generate-content/${cv._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Generate Content
                </Link>
                <button
                  onClick={() => handleDelete(cv._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/create-cv"
        className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create New CV
      </Link>
    </div>
  );
}
