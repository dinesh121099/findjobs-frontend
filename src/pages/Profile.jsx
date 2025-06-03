import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    skills: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle skills (comma separated)
  const handleSkillsChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    }));
  };

  // Submit updated profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user/me`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email (read-only)</label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="location" className="block mb-1 font-semibold">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="skills" className="block mb-1 font-semibold">
            Skills (comma separated)
          </label>
          <input
            id="skills"
            name="skills"
            type="text"
            value={profile.skills.join(", ")}
            onChange={handleSkillsChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
