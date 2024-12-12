import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCV from "./pages/CreateCV";
import EditCV from "./pages/EditCV";
import GenerateContent from "./pages/GenerateContent";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-cv" element={<CreateCV />} />
            <Route path="/edit-cv/:id" element={<EditCV />} />
            <Route path="/generate-content/:id" element={<GenerateContent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
