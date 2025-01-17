'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface SubmissionDetailsProps {
  language: string
  result: string
}

const CompanyVideos: React.FC<SubmissionDetailsProps> = ({ language, result }) => (
  <div className="space-y-4 dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] ">
    <h2 className="text-xl font-bold bg-[#f3f3f3] dark:bg-[#363636] text-[#263238] dark:text-[#e6e6e6]">Submission Details</h2>
    <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
      <p>
        <strong>Language:</strong> {language}
      </p>
      <p className="mt-4 flex flex-col">
        <strong>Big-O Analysis:</strong>{' '}
        <span className="text-md font-thin">
          <code>{result}</code>
        </span>
      </p>
    </div>
  </div>
)

export default function CompanyVideosPage() {
  const [showSubmission, setShowSubmission] = useState(false)

  const toggleSubmission = () => {
    setShowSubmission(!showSubmission)
  }

  return (
    <div>
      <button
        onClick={toggleSubmission}
        className="bg-[#FFA116] hover:bg-[#FFB84D]  text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50"
      >
        {showSubmission ? 'Hide Submission' : 'Show Submission'}
      </button>

      {showSubmission && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 z-50 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <button
              onClick={toggleSubmission}
              className="absolute top-4 right-4 p-1"
            >
              <X className="h-6 w-6" />
            </button>
            <CompanyVideos
              language="JavaScript"
              result="O(n) time complexity, O(1) space complexity"
            />
            <button
              onClick={toggleSubmission}
              className="w-full mt-8 bg-[#FFA116] hover:bg-[#FFB84D] text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}





