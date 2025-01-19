import { ArrowBigLeft, Brush, X } from "lucide-react"
import { useState } from "react"
import YouTubeSearch from "./YouTubeSearch"  // Assuming you have the YouTube search component
import YouTubeIcon from "./YoutubeIcon"

const ToggleButtonYt = () => {
  // State to toggle visibility of the YouTube search
  const [showSubmission, setShowSubmission] = useState(false)

  // Toggle function
  const toggleSubmission = () => {
    setShowSubmission((prev) => !prev)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSubmission}
        className="w-8 h-8 rounded-full flex justify-center items-center">
        {/* <Brush className="h-4 w-4 text-white dark:text-black" /> */}
        <YouTubeIcon/>

      </button>

      {/* Conditional Content Display */}
      {showSubmission && (
        <div className="fixed inset-0 bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] z-50 overflow-auto">
          {/* Close Button */}
          <button onClick={toggleSubmission} className="absolute top-4 left-4 p-1 z-[999]">
        <ArrowBigLeft className="h-6 w-6 border-solid "/>
          </button>
          {/* Content of YouTube Search */}
          <div className="max-w-full mx-auto px-4 py-8 mt-4">
            <YouTubeSearch />
          </div>
        </div>
      )}
    </>
  )
}

export default ToggleButtonYt
