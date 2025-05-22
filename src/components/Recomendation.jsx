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
          `${import.meta.env.VITE_API_BASE_URL}/api/ai/recommendations`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Expecting structured JSON from backend (array of job recommendations)
        const jobs = res.data.recommendations || []; // adjust key based on actual response
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
      {recommendations.map((job, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company} — {job.location}</p>
          <p className="text-sm mt-2">{job.description}</p>
          {job.skills && job.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 text-xs rounded">{skill}</span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
