import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/ai/recommendations`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const recommendationsObj = JSON.parse(res.data.recommendations);
        const jobs = recommendationsObj.matches || [];
        setRecommendations(jobs);
      } catch (error) {
        toast.error("Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading your AI matches...</p>;

  if (!recommendations.length) return <p>No matches found. Try updating your profile.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h3> TOP 3 Matches</h3>
      {recommendations.map((job, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white cursor-pointer"
        >
          <p className="text-gray-800">{job}</p>
        </motion.div>
      ))}
  </div>
  );
}
