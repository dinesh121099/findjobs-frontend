import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();
  const { login } = useUser();

  const validateEmail = () => {
    const isValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    setValidEmail(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        { name, email, password }
      );
      login( {token: res.data.token} );
      toast.success("Signup successful");
      navigate("/profile");
    } 
    catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    } 
    finally {
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="p-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            className="p-2 border rounded"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!passwordMatch && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}

          <label className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            Show Passwords
          </label>

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
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
