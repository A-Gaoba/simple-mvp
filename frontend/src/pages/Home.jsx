import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CV Management</h1>
      <p className="text-xl mb-8">
        Manage your CVs and generate tailored content with AI
      </p>

      {isAuthenticated ? (
        <div className="space-y-4">
          <p className="text-lg">You&apos;re logged in!</p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
