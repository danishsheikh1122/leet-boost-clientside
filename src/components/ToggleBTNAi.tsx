import { ArrowBigLeft } from "lucide-react"
import { useState } from "react"

import ChatCMP from "./ChatCMP"

interface ToggleButtonAiProps {
  onToggle: () => void;
  showSubmission: boolean;
}

const ToggleButtonAi: React.FC<ToggleButtonAiProps> = ({ onToggle, showSubmission }) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="w-8 h-8 rounded-full bg-black dark:bg-white flex justify-center items-center">
        AI
      </button>

      {/* Conditional Content Display */}
      {showSubmission && (
        <div className="fixed inset-0 bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] z-50 overflow-auto">
          {/* Close Button */}
          <button
            onClick={onToggle}
            className="absolute top-4 left-4 p-1 z-[999]">
            <ArrowBigLeft className="h-6 w-6 border-solid " />
          </button>
          {/* Content of YouTube Search */}
          <div className="max-w-full mx-auto px-4 py-8 mt-4">
            <ChatCMP />
          </div>
        </div>
      )}
    </>
  )
}

export default ToggleButtonAi
