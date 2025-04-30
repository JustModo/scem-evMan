// import React from "react";

// // Admin Analytics Landing Page
// // Overview of contest analytics and navigation to other admin functions.
// export default function AdminAnalyticsPage() {
//   return <div>AdminAnalyticsPage Screen</div>;
// }
import React from "react";

// Admin Analytics Landing Page
// Overview of contest analytics and navigation to other admin functions.
export default function AdminAnalyticsPage() {
  const stats = {
    totalContests: 120,
    totalParticipants: 3400,
    averageScore: "86%",
    topPerformer: "John Doe",
  };

  return (
    
    <div className="min-h-screen bg-white py-16 px-4 flex justify-center items-center">
      <div className="bg-black text-white border border-green-500 rounded-2xl p-10 max-w-5xl w-full text-center shadow-xl">
        <h2 className="text-4xl font-bold text-green-400 mb-4">Platform  Stats</h2>
        <p className="text-lg text-gray-300 mb-10">Overview of contests and performance metrics</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-green-900 p-6 rounded-xl shadow-md border border-green-500">
            <h3 className="text-3xl font-bold text-green-300">{stats.totalContests}</h3>
            <p className="mt-2 text-gray-200">Total Contests</p>
          </div>
          <div className="bg-green-900 p-6 rounded-xl shadow-md border border-green-500">
            <h3 className="text-3xl font-bold text-green-300">{stats.totalParticipants}</h3>
            <p className="mt-2 text-gray-200">Total Participants</p>
          </div>
          <div className="bg-green-900 p-6 rounded-xl shadow-md border border-green-500">
            <h3 className="text-3xl font-bold text-green-300">{stats.averageScore}</h3>
            <p className="mt-2 text-gray-200">Average Score</p>
          </div>
          <div className="bg-green-900 p-6 rounded-xl shadow-md border border-green-500">
            <h3 className="text-3xl font-bold text-green-300">{stats.topPerformer}</h3>
            <p className="mt-2 text-gray-200">Top Performer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
