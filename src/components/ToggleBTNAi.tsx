import { Brush, X } from "lucide-react"
import ChatCMP from "./ChatCMP"
const ToggleButtonAi = ({ onToggle, showSubmission }) => {
  return (
    <>
      <button
        title="Draw"
        onClick={onToggle}
        className="w-8 h-8 rounded-full bg-black  dark:bg-white  flex justify-center items-center">
          AI
      </button>

      {showSubmission && (
        <div className="fixed inset-0  bg-white dark:bg-black text-black dark:text-[#e6e6e6] z-50 overflow-auto">
          {/* max-w to change the width  */}
          <div className="max-w-full mx-auto px-4 py-8">
            <button
              onClick={onToggle}
              className="absolute top-8 right-4 p-1 z-[99999999] flex items-center flex-col">
              <X className="h-14 w-24  dark:text-black text-white dark:bg-white bg-black" />
              ! SAVED
            </button>
            {/* Add content here */}
            <ChatCMP/>
          </div>
        </div>
      )}
    </>
  )
}

export default ToggleButtonAi
