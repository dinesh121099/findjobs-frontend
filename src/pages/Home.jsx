import React, { useState } from 'react';
import JobList from '../components/Joblist';
import Recommendations from '../components/Recomendation';

const Home = () => {
    const [ShowRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to FindJobs!</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Job Listings</h2>
        <JobList />
      </section>

      <div className="text-center mt-10">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowRecommendations(true)}
        >
          Find My Matches
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your AI-Powered Matches</h2>
        {ShowRecommendations && <Recommendations />}
      </section>

    </div>
  );
};

export default Home;