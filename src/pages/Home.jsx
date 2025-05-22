import React from 'react';
import JobList from '../components/Joblist';
// import Recommendations from '../components/Recommendations';

const Home = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to FindJobs!</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Job Listings</h2>
        <JobList />
      </section>
    
    <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your AI-Powered Matches</h2>
        {/* <Recommendations /> */}
      </section>

    </div>
  );
};

export default Home;