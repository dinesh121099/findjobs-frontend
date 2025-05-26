import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token") || null;
        if(!token){
          navigate("/login");
        }
        else{
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobs(res.data);
        }
      } catch (error) {
        if(error.status == '401'){
          toast.info("Session expired - Login again");
          navigate("/login");
        }
        else{
          toast.error("Failed to load job listings.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length ? (
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="p-4 border rounded shadow-sm cursor-pointer bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-lg font-bold">{job.title}</h3>
              <span className="text-gray-600">{job.company},</span>{" "}
              <span className="text-sm text-gray-500">{job.location}</span>

              <p className="text-sm text-gray-500 mt-1">Skills Required:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {job.skills.map((skill, i) => (
                  <span
                    key={`${skill}-${i}`}
                    className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No job listings found.</p>
      )}
    </div>
  );
};

export default JobList;
