import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
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
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2>LOG IN</h2>
          <h5>Having an account already?</h5>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="my-2">Your email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2"
          />
          {!validEmail && (
            <p className="text-xs text-red-500 ml-2 -mt-2">Please enter a valid email</p>
          )}

          <label htmlFor="password" className="my-2">Your password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2"
          />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading || !validEmail}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col items-center space-y-3 mt-6">
          <hr className="w-full border-t" />
          <h5>Don&apos;t have an account?</h5>
          <button className="w-full border py-2 rounded" >Sign Up</button>
        </div>
      </div>
    </div>
  );
}
