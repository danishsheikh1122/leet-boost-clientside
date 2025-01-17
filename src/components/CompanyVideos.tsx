// "use client"

// import { X } from "lucide-react"
// import { useEffect, useState } from "react"

// const CompanyDetailss = async () => {
//   const [videos, setVideos] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [problemNamee, setProblemName] = useState("")
//   chrome.runtime.onMessage.addListener((message: any) => {
//     console.log("Received message:", message)
//     if (message.action === "sendCompanyNames" && message.result) {
//       const result =
//         typeof message.result === "string"
//           ? JSON.parse(message.result)
//           : message.result
//       console.log("Parsed problem name from result:", result[0])

//       fetchVideos(result[0])

//       setProblemName(result[0])
//     }
//   })
//   const fetchVideos = async ({ problemName }: { problemName: String }) => {
//     console.log("ok")
//     setLoading(true)

//     try {
//       console.log("okk")

//       const response = await fetch(
//         `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${problemName}`
//       )
//       if (!response.ok) {
//         throw new Error("Failed to fetch videos")
//       }
//       const data = await response.json()
//       setVideos(data.videos || []) // Assuming the API returns an array of videos
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // const fetchVideos = async () => {
//   //   console.log(problemNamee)
//   //   setLoading(true)

//   //   try {
//   //     const response = await fetch(
//   //       `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${problemNamee}`
//   //     )
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch videos")
//   //     }
//   //     const data = await response.json()
//   //     setVideos(data.videos || []) // Assuming the API returns an array of videos
//   //   } catch (err) {
//   //     setError(err.message)
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }
//   // useEffect(() => {
//   //   if (problemNamee) {
//   //     fetchVideos()
//   //   }
//   // }, [problemNamee])

//   if (loading) {
//     return <p>Loading videos...</p>
//   }

//   if (error) {
//     return <p>Error: {error}</p>
//   }

//   if (videos.length === 0) {
//     return <p>No videos found for this problem.</p>
//   }

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold text-[#FFA116]">Videos</h2>
//       <div className="space-y-4">
//         {videos.map((video, index) => (
//           <div
//             key={index}
//             className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
//             <a
//               href={video.embedded_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[#FFA116] underline">
//               {video.channel}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default function CompanyVideos() {
//   const [showSubmission, setShowSubmission] = useState(false)

//   const toggleSubmission = () => {
//     setShowSubmission(!showSubmission)
//   }

//   return (
//     <div className="w-full h-full">
//       <button
//         onClick={toggleSubmission}
//         className="w-full bg-[#FFA116] hover:bg-[#FFB84D]  text-white  py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
//         {showSubmission ? "Hide Submission" : "Show Submission"}
//       </button>

//       {showSubmission && (
//         <div className="fixed inset-0 bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] z-50 overflow-auto">
//           <div className="max-w-4xl mx-auto px-4 py-8">
//             <button
//               onClick={toggleSubmission}
//               className="absolute top-4 right-4 p-1">
//               <X className="h-6 w-6" />
//             </button>
//             <CompanyDetailss />
//             <button
//               onClick={toggleSubmission}
//               className="w-full mt-8 bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
//               Go Back
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const CompanyDetailss = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [problemName, setProblemName] = useState("");

  useEffect(() => {
    const handleMessage = async (message) => {
      console.log("Received message:", message);
      if (message.action === "sendCompanyNames" && message.result) {
        const result =
          typeof message.result === "string"
            ? JSON.parse(message.result)
            : message.result;
        console.log("Parsed problem name from result:", result[0]);
        setProblemName(result[0]);

        try {
          setLoading(true);
          const response = await fetch(
            `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${result[0]}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch videos");
          }
          const data = await response.json(); // Await the JSON parsing
          console.log("Fetched videos:", data);
          setVideos(data.videos || []);
        } catch (err) {
          console.error("Error fetching videos:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (videos.length === 0) {
    return <p>No videos found for this problem.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#FFA116]">Videos</h2>
      <div className="space-y-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
            <a
              href={video.embedded_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFA116] underline">
              {video.channel}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CompanyVideos() {
  const [showSubmission, setShowSubmission] = useState(false);

  const toggleSubmission = () => {
    setShowSubmission((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={toggleSubmission}
        className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
        {showSubmission ? "Hide Submission" : "Show Submission"}
      </button>

      {showSubmission && (
        <div className="fixed inset-0 bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] z-50 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <button
              onClick={toggleSubmission}
              className="absolute top-4 right-4 p-1">
              <X className="h-6 w-6" />
            </button>
            <CompanyDetailss />
            <button
              onClick={toggleSubmission}
              className="w-full mt-8 bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
