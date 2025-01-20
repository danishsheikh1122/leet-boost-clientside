// // working if the youtube limit is reached
// // 'use client'

// // import { useState, useEffect } from "react";
// // import { Search, ArrowLeft } from 'lucide-react';

// // const formatViews = (views: number): string => {
// //   if (views >= 1000000) {
// //     return `${(views / 1000000).toFixed(1)}M views`;
// //   } else if (views >= 1000) {
// //     return `${(views / 1000).toFixed(1)}K views`;
// //   } else {
// //     return `${views} views`;
// //   }
// // };

// // const YouTubeSearch = () => {
// //   const [query, setQuery] = useState("");
// //   const [videos, setVideos] = useState([]);
// //   const [selectedVideo, setSelectedVideo] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [leetCodeVideos, setLeetCodeVideos] = useState([]);

// //   const apiKey = process.env.PLASMO_PUBLIC_YOUTUBE_API_KEY;

// //   const handleSearch = async () => {
// //     if (!query) return;

// //     setLoading(true);
// //     setError(null);
// //     setVideos([]);
// //     setLeetCodeVideos([]);

// //     try {
// //       const response = await fetch(
// //         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=vidheo&key=${apiKey}&maxResults=20`
// //       );
// //       const data = await response.json();
// //       if (data.error) {
// //         throw new Error(data.error.message);
// //       }
// //       setVideos([]);

// //       if (true) {
// //         // If no YouTube results, fetch from LeetCode API
// //         const leetCodeResponse = await fetch(
// //           `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${encodeURIComponent(query)}`
// //         );
// //         const leetCodeData = await leetCodeResponse.json();
// //         setLeetCodeVideos(leetCodeData.videos || []);
// //       }

// //       setSelectedVideo(null);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //       setError("An error occurred while fetching videos. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVideoSelect = (video) => {
// //     setSelectedVideo(video);
// //   };

// //   const handleGoBack = () => {
// //     setSelectedVideo(null);
// //   };

// //   return (
// //     <div className="min-h-screen bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6]">
// //       <header className="flex items-center justify-between p-4 bg-[#f3f3f3] dark:bg-[#363636] border-b border-gray-200 dark:border-gray-700">
// //         <h1 className="text-2xl font-bold text-[#FFA116]">LeetTube</h1>
// //         <div className="flex-1 max-w-2xl mx-4 flex items-center">
// //           <div className="relative flex-grow">
// //             <input
// //               type="text"
// //               placeholder="Search for a video or enter problem name"
// //               value={query}
// //               onChange={(e) => setQuery(e.target.value)}
// //               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// //               className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFA116] bg-white dark:bg-[#282828]"
// //             />
// //             <Search className="absolute left-3 top-2.5 text-gray-400" />
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="ml-2 px-4 py-2 bg-[#FFA116] text-white rounded-full hover:bg-[#FFB84D] focus:outline-none transition duration-300"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </header>

// //       <main className="container mx-auto p-4 mt-8">
// //         {loading && (
// //           <div className="flex justify-center items-center h-64">
// //             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FFA116]"></div>
// //           </div>
// //         )}

// //         {error && (
// //           <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded relative" role="alert">
// //             <strong className="font-bold">Error!</strong>
// //             <span className="block sm:inline"> {error}</span>
// //           </div>
// //         )}

// //         {!selectedVideo ? (
// //           <div>
// //             {videos.length > 0 ? (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {videos.map((video) => (
// //                   <div
// //                     key={video.id.videoId}
// //                     className="bg-white dark:bg-[#363636] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
// //                     onClick={() => handleVideoSelect(video)}
// //                   >
// //                     <img
// //                       src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
// //                       alt={video.snippet.title}
// //                       className="w-full h-48 object-cover"
// //                     />
// //                     <div className="p-4">
// //                       <h4 className="text-lg font-semibold line-clamp-2">{video.snippet.title}</h4>
// //                       <p className="text-sm text-[#FFA116] mt-2">{video.snippet.channelTitle}</p>
// //                       <p className="text-sm text-gray-500 dark:text-gray-400">{formatViews(Math.floor(Math.random() * 1000000))} • {new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : leetCodeVideos.length > 0 ? (
// //               <div>
// //                 <h2 className="text-xl font-semibold mb-4">LeetCode Problem: {query}</h2>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                   {leetCodeVideos.map((video) => (
// //                     <div
// //                       key={video.videoId}
// //                       className="bg-white dark:bg-[#363636] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
// //                       onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
// //                     >
// //                       <img
// //                         src={video.thumbnailUrl || "/placeholder.svg"}
// //                         alt={video.title}
// //                         className="w-full h-48 object-cover"
// //                       />
// //                       <div className="p-4">
// //                         <h4 className="text-lg font-semibold line-clamp-2">{video.title}</h4>
// //                         <p className="text-sm text-[#FFA116] mt-2">{video.channelName}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : !loading && (
// //               <div className="text-center mt-8">
// //                 <p className="text-xl font-semibold mb-2">No results found for "{query}"</p>
// //                 <p>Try entering the exact name of a DSA problem, like "two sum" or "permutations"</p>
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="w-full">
// //             <button
// //               onClick={handleGoBack}
// //               className="mb-4 px-4 py-2 bg-[#f3f3f3] dark:bg-[#363636] text-[#263238] dark:text-[#e6e6e6] rounded-full hover:bg-[#FFB84D] dark:hover:bg-[#FFB84D] hover:text-white dark:hover:text-white focus:outline-none transition duration-300 flex items-center"
// //             >
// //               <ArrowLeft className="mr-2" /> Go Back
// //             </button>
// //             <div className="aspect-w-16 aspect-h-9 mb-4">
// //               <iframe
// //                 src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
// //                 frameBorder="0"
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                 allowFullScreen
// //                 className="w-full h-full rounded-lg shadow-lg"
// //               ></iframe>
// //             </div>
// //             <h3 className="text-2xl font-semibold mb-2">{selectedVideo.snippet.title}</h3>
// //             <p className="text-[#FFA116] mb-2">{selectedVideo.snippet.channelTitle}</p>
// //             <p className="text-gray-600 dark:text-gray-300 mb-4">{formatViews(Math.floor(Math.random() * 10000000))} • {new Date(selectedVideo.snippet.publishedAt).toLocaleDateString()}</p>
// //             <p className="text-gray-800 dark:text-gray-200 mb-4">{selectedVideo.snippet.description}</p>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default YouTubeSearch;

// 'use client'

// import { useState } from "react";
// import { Search, ArrowLeft } from 'lucide-react';

// interface LeetCodeVideo {
//   embedded_url: string;
//   channel: string;
// }

// interface LeetCodeResponse {
//   problemName: string;
//   videos: LeetCodeVideo[];
// }

// const YouTubeSearch = () => {
//   const [query, setQuery] = useState("");
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [leetCodeVideos, setLeetCodeVideos] = useState<LeetCodeResponse | null>(null);

//   const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

//   const handleSearch = async () => {
//     if (!query) return;

//     setLoading(true);
//     setError(null);
//     setVideos([]);
//     setLeetCodeVideos(null);

//     try {
//       // First try LeetCode API
//       const leetCodeResponse = await fetch(
//         `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${encodeURIComponent(query)}`
//       );
//       const leetCodeData = await leetCodeResponse.json();

//       if (leetCodeData.videos && leetCodeData.videos.length > 0) {
//         setLeetCodeVideos(leetCodeData);
//       } else {
//         // If no LeetCode videos, try YouTube API
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}&maxResults=20`
//         );
//         const data = await response.json();
//         if (data.error) {
//           throw new Error(data.error.message);
//         }
//         setVideos(data.items || []);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("An error occurred while fetching videos. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVideoSelect = (video) => {
//     setSelectedVideo(video);
//   };

//   const handleGoBack = () => {
//     setSelectedVideo(null);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6]">
//       <header className="sticky top-0 z-50 bg-[#f3f3f3] dark:bg-[#363636] border-b border-gray-200 dark:border-gray-700">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <h1 className="text-2xl font-bold text-[#FFA116] whitespace-nowrap">LeetTube</h1>
//             <div className="flex-1 max-w-3xl mx-8">
//               <div className="flex items-center gap-2">
//                 <div className="relative flex-1">
//                   <input
//                     type="text"
//                     placeholder="Search for a LeetCode problem (e.g., 'Permutations', 'Two Sum')"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                     className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFA116] bg-white dark:bg-[#282828] transition-all"
//                   />
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 </div>
//                 <button
//                   onClick={handleSearch}
//                   className="h-10 px-6 bg-[#FFA116] text-white rounded-full hover:bg-[#FFB84D] focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-offset-2 dark:focus:ring-offset-[#282828] transition-all font-medium"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {loading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFA116] border-t-transparent"></div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg" role="alert">
//             <p className="font-medium">{error}</p>
//           </div>
//         )}

//         {!selectedVideo ? (
//           <div>
//             {leetCodeVideos ? (
//               <div>
//                 <h2 className="text-2xl font-bold mb-6">Solutions for: {leetCodeVideos.problemName}</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
//                   {leetCodeVideos.videos.map((video, index) => (
//                     <div
//                       key={index}
//                       className="bg-white dark:bg-[#363636] h-[50rem] w-full inline-block  rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <div className="h-[50rem] w-full">
//                         <iframe
//                           src={video.embedded_url}
//                           title={`Solution by ${video.channel}`}
//                           frameBorder="0"
//                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                           allowFullScreen
//                           className="w-full h-full"
//                         ></iframe>
//                       </div>
//                       <div className="p-4">
//                         <p className="text-[#FFA116] font-medium">{video.channel}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : videos.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {videos.map((video) => (
//                   <div
//                     key={video.id.videoId}
//                     className="bg-white dark:bg-[#363636] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//                     onClick={() => handleVideoSelect(video)}
//                   >
//                     <img
//                       src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
//                       alt={video.snippet.title}
//                       className="w-full aspect-video object-cover"
//                     />
//                     <div className="p-4">
//                       <h4 className="font-medium line-clamp-2 mb-2">{video.snippet.title}</h4>
//                       <p className="text-sm text-[#FFA116]">{video.snippet.channelTitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : !loading && query && (
//               <div className="text-center py-12">
//                 <p className="text-xl font-medium mb-2">No results found for "{query}"</p>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Try searching for a specific LeetCode problem like "Two Sum" or "Permutations"
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="max-w-5xl mx-auto">
//             <button
//               onClick={handleGoBack}
//               className="mb-6 px-4 py-2 flex items-center gap-2 text-[#FFA116] hover:text-[#FFB84D] transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Back to results</span>
//             </button>
//             <div className="aspect-w-16 aspect-h-9 mb-6">
//               <iframe
//                 src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
//                 title={selectedVideo.snippet.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full rounded-lg shadow-lg"
//               ></iframe>
//             </div>
//             <h3 className="text-2xl font-bold mb-2">{selectedVideo.snippet.title}</h3>
//             <p className="text-[#FFA116] font-medium mb-4">{selectedVideo.snippet.channelTitle}</p>
//             <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{selectedVideo.snippet.description}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default YouTubeSearch;

"use client"

import { Database, Search, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"
import YouTubeIcon from "./YoutubeIcon"

interface Video {
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: { medium: { url: string } }
    channelTitle: string
  }
}

interface LeetCodeVideo {
  embedded_url: string
  channel: string
}

interface LeetCodeResponse {
  problemName: string
  videos: LeetCodeVideo[]
}

const YouTubeSearch = () => {
  const [query, setQuery] = useState("")
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leetCodeVideos, setLeetCodeVideos] = useState<LeetCodeResponse | null>(
    null
  )
  const [isOnline, setIsOnline] = useState(true)

  const apiKey = process.env.PLASMO_PUBLIC_YOUTUBE_API_KEY

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setError(null)
    setVideos([])
    setLeetCodeVideos(null)

    try {
      if (!isOnline) {
        // Online mode: Fetch from YouTube API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}&maxResults=20`
        )
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error.message)
        }
        setVideos(data.items || [])
      } else {
        // Offline mode: Fetch from LeetCode extension
        const leetCodeResponse = await fetch(
          `https://leet-code-extension-companydata.vercel.app/videosByProblemName?problemName=${encodeURIComponent(query)}`
        )
        const leetCodeData = await leetCodeResponse.json()

        if (leetCodeData.videos && leetCodeData.videos.length > 0) {
          setLeetCodeVideos(leetCodeData)
        } else {
          setError("No offline results found. Try switching to online mode.")
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Quota Exceeded. Use database mode or try again after 24 hrs.")
    } finally {
      setLoading(false)
    }
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
  }

  const toggleMode = () => {
    setIsOnline(!isOnline)
    setVideos([])
    setLeetCodeVideos(null)
    setSelectedVideo(null)
    setError(null)
  }

  useEffect(() => {
    if (query) {
      handleSearch()
    }
  }, [isOnline])

  return (
    <div className="min-h-screen bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6]">
      <header className="sticky top-0 z-50 bg-[#f3f3f3] dark:bg-[#363636] border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-[#FFA116] whitespace-nowrap lg:block md:hidden hidden">
              LeetTube
            </h1>
            <div className="flex-1 max-w-3xl mx-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={
                      !isOnline
                        ? "Search YouTube videos"
                        : "Search LeetCode with exact problems name"
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFA116] bg-white dark:bg-[#282828] transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-8 px-4 bg-[#FFA116] text-white rounded-full hover:bg-[#FFB84D] focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-offset-2 dark:focus:ring-offset-[#282828] transition-all font-medium">
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMode}
                className="flex items-center space-x-2 px-3 py-1 rounded-full  text-white  transition-colors">
                {!isOnline ? (
                  <>
                    <span>From</span>
                    <YouTubeIcon/>
                  </>
                ) : (
                  <>
                    <span>From</span>
                    <Database className="w-6 h-6 text-[#FFA116]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFA116] border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
            role="alert">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!isOnline ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className="bg-white dark:bg-[#363636] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleVideoSelect(video)}>
                <img
                  src={
                    video.snippet.thumbnails.medium.url || "/placeholder.svg"
                  }
                  alt={video.snippet.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium line-clamp-2 mb-2">
                    {video.snippet.title}
                  </h4>
                  <p className="text-sm text-[#FFA116]">
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : leetCodeVideos ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#FFA116]">
              Solutions for: {leetCodeVideos.problemName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {leetCodeVideos.videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#363636] h-[30rem] w-full inline-block rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-full w-full">
                    <iframe
                      src={video.embedded_url}
                      title={`Solution by ${video.channel}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"></iframe>
                  </div>
                  <div className="p-4">
                    <p className="text-[#FFA116] font-medium">
                      {video.channel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading &&
          query && (
            <div className="text-center py-12">
              {/* <p className="text-xl font-medium mb-2">
                No  "{query}"
              </p> */}
              <p className="text-gray-600 dark:text-gray-400">
                {!isOnline
                  ? "Try adjusting your search terms or check your internet connection."
                  : "Try searching for a LeetCode problem exactly like 'Two Sum' or 'Permutations'."}
              </p>
            </div>
          )
        )}


        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
            <div className="bg-white dark:bg-[#363636] rounded-lg shadow-xl max-w-[90%] w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">

              <div className="w-full h-[30rem]">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-t-lg"></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {selectedVideo.snippet.title}
                </h3>
                <p className="text-[#FFA116] font-medium mb-2">
                  {selectedVideo.snippet.channelTitle}
                </p>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {selectedVideo.snippet.description}
                </p>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="mt-4 px-4 py-2 bg-[#FFA116] text-white rounded hover:bg-[#FFB84D] transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default YouTubeSearch
