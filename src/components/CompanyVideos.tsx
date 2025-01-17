"use client"

import { X } from "lucide-react"
import { useState } from "react"

const CompanyDetailss = ({ language, result }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-[#FFA116]">Submission Details</h2>
    <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
      <p>
        <strong>Language:</strong> {language}
      </p>
      <p className="mt-4 flex flex-col">
        <strong>Big-O Analysis:</strong>{" "}
        <span className="text-md font-thin">
          <code>{result}</code>
        </span>
      </p>
    </div>
  </div>
)

export default function CompanyVideos() {
  const [showSubmission, setShowSubmission] = useState(false)

  const toggleSubmission = () => {
    setShowSubmission(!showSubmission)
  }

  return (
    <div className="w-full h-full">
      <button
        onClick={toggleSubmission}
        className="bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
        {showSubmission ? "Hide Submission" : "Show Submission"}
      </button>

      {showSubmission && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 z-50 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <button
              onClick={toggleSubmission}
              className="absolute top-4 right-4 p-1">
              <X className="h-6 w-6" />
            </button>
            <CompanyDetailss language="JavaScript" result="O(n)" />
            <button
              onClick={toggleSubmission}
              className="w-full mt-8 bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// 'use client'

// import { useState } from 'react'
// import { X } from 'lucide-react'

// interface SubmissionDetailsProps {
//   language: string
//   result: string
// }

// const CompanyDetailss: React.FC<SubmissionDetailsProps> = ({ language, result }) => (
//   <div className="space-y-4">
//     <h2 className="text-xl font-bold text-[#FFA116]">Submission Details</h2>
//     <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
//       <p>
//         <strong>Language:</strong> {language}
//       </p>
//       <p className="mt-4 flex flex-col">
//         <strong>Big-O Analysis:</strong>{" "}
//         <span className="text-md font-thin">
//           <code>{result}</code>
//         </span>
//       </p>
//     </div>
//   </div>
// )

// export default function CompanyVideos() {
//   const [showSubmission, setShowSubmission] = useState(false)

//   const toggleSubmission = () => {
//     setShowSubmission((prev) => !prev)
//   }

//   return (
//     <div className="relative">
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSubmission}
//         className="bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50"
//       >
//         {showSubmission ? 'Hide Submission' : 'Show Submission'}
//       </button>

//       {/* Modal */}
//       {showSubmission && (
//         <div className="fixed inset-0 bg-white dark:bg-gray-800 z-50 overflow-auto">
//           <div className="relative max-w-4xl mx-auto px-4 py-8">
//             {/* Close Button */}
//             <button
//               onClick={toggleSubmission}
//               className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full"
//             >
//               <X className="h-6 w-6" />
//             </button>

//             {/* Back Button */}
//             <button
//               onClick={toggleSubmission}
//               className="w-full mt-8 bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
