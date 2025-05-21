import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    const isValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    setValidEmail(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-sm text-gray-500">Create a new account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="p-2 border rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!validEmail && <p className="text-xs text-red-500">Enter a valid email address</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 border rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
