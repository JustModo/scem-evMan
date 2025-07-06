// "use client";

// import React from "react";
// import { ContestLandingData } from "@/types/contest";

// interface ContestCardProps {
//   data: ContestLandingData;
// }

// const ContestCard: React.FC<ContestCardProps> = ({ data }) => {
//   return (
//     <div className="min-h-screen flex items-start justify-center bg-[#B8E1B0] py-12 px-4">
//       <div className="w-full max-w-4xl px-8 py-10 rounded-3xl bg-white/60 backdrop-blur-md shadow-2xl border border-white/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_50px_rgba(0,0,0,0.1)] mt-10">
//         {/* Title */}
//         <h2 className="text-4xl font-extrabold text-center text-zinc-900 drop-shadow-md mb-4">
//           {data.title}
//         </h2>

//         {/* Description */}
//         <p className="text-lg text-center text-zinc-700 mb-6">
//           {data.description}
//         </p>

//         {/* Info Grid */}
//         <div className="grid grid-cols-2 gap-6 text-base text-zinc-800 mb-6">
//           <div>
//             <span className="font-semibold">🕒 Start Time:</span><br />
//             {data.duration.start.toLocaleString()}
//           </div>
//           <div>
//             <span className="font-semibold">⏰ End Time:</span><br />
//             {data.duration.end.toLocaleString()}
//           </div>
//           <div>
//             <span className="font-semibold">🧩 Total Problems:</span><br />
//             {data.totalProblems}
//           </div>
//           <div>
//             <span className="font-semibold">✍️ Author:</span><br />
//             {data.author}
//           </div>
//         </div>

//         {/* Rules Section */}
//         <div className="bg-white/40 rounded-xl p-4 border border-white/20 mb-4 shadow-inner">
//           <h3 className="text-xl font-semibold text-zinc-900 mb-3">
//             📜 Contest Rules
//           </h3>
//           <ul className="list-disc pl-6 space-y-1 text-zinc-700">
//             {data.rules.map((rule, idx) => (
//               <li key={idx}>{rule}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContestCard;
"use client";

import React from "react";
import { ContestLandingData } from "@/types/contest";

interface ContestCardProps {
  data: ContestLandingData;
}

const ContestCard: React.FC<ContestCardProps> = ({ data }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#B8E1B0]">
      <div className="w-full max-w-2xl px-6 py-8 rounded-2xl bg-black border-2 border-[#3F5E3B] shadow-lg transition-transform duration-200 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#B8E1B0] mb-3">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-base text-center text-gray-300 mb-4">
          {data.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-200 mb-4">
          <div>
            <span className="font-semibold text-[#B8E1B0]">🕒 Start:</span><br />
            {data.duration.start.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-[#B8E1B0]">⏰ End:</span><br />
            {data.duration.end.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-[#B8E1B0]">🧩 Problems:</span><br />
            {data.totalProblems}
          </div>
          <div>
            <span className="font-semibold text-[#B8E1B0]">✍️ Author:</span><br />
            {data.author}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-black/20 rounded-lg p-3 border border-[#3F5E3B] mb-2">
          <h3 className="text-lg font-semibold text-[#B8E1B0] mb-2">
            📜 Rules
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-200 text-sm">
            {data.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
