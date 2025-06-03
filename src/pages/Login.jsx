import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      login({token: res.data.token});
      toast.success("Login successful");
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" >LOG IN</h2>
          <p className="text-sm text-gray-500">Having an account already?</p>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="my-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded"
          />
          {!validEmail && (
            <p className="text-xs text-red-500 ml-2 -mt-2">Please enter a valid email</p>
          )}

          <label htmlFor="password" className="my-2">Your password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border rounded"
          />

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer"  disabled={loading || !validEmail}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col items-center space-y-3 mt-6">
          <hr className="w-full border-t" />
          <h5>Don&apos;t have an account?</h5>
          <button 
            className="w-full border py-2 rounded hover:bg-red-600 hover:text-white cursor-pointer" 
            type="button" 
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
