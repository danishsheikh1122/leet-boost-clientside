// // src/index.tsx or src/popup.tsx
// // always add import './style.css'; to add tailwind styling 

import './style.css';

'use client'

import React, { useState } from 'react'
import { Play, Moon, Sun } from 'lucide-react'


export default function LeetBoostHomePro() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`font-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] rounded-lg shadow-lg p-6 space-y-6 transition-colors duration-200">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FFA116]">LeetBoost</h1>
          <button
            onClick={toggleDarkMode}
            className="w-12 h-12 bg-[#f3f3f3] dark:bg-[#363636] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-[#282828] translate-x-0' : 'bg-white translate-x-2'}`}>
              {isDarkMode ? (
                <Moon className="w-6 h-6 text-[#FFA116]" />
              ) : (
                <Sun className="w-6 h-6 text-[#FFA116]" />
              )}
            </div>
          </button>
        </header>
        
        <p className="text-sm leading-relaxed">
          Your smart companion to crack coding interviews with ease.
        </p>
        
        <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
          <Play className="w-5 h-5" />
          <span>Start Boosting</span>
        </button>
        
        <div className="space-y-3">
          <h2 className="font-semibold text-lg text-[#FFA116]">Why Use LeetBoost?</h2>
          <ul className="text-sm space-y-2">
            {[
              "Analyze Code Complexity",
              "Track Companies",
              "Auto Cloud Sync",
              "Push to GitHub",
              "Comprehensive Insights",
              "No Premium Required"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-[#FFA116] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-sm italic text-center text-[#4CAF50] dark:text-[#69F0AE] font-medium">
          Unlock productivity and efficiency like never before!
        </p>
      </div>
    </div>
  )
}



document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button")
  if (button) {
    button.addEventListener("click", () => {
      console.log("Button clicked!")
    })
  }
})

// import React, { useState } from "react";
// import { Play, Moon, Sun } from "lucide-react"; // Optional icons

// const SidePanel = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <div className={`font-sans ${isDarkMode ? 'dark' : ''}`}>
//       <div className="bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] rounded-lg shadow-lg p-6 space-y-6 transition-colors duration-200">
//         <header className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#FFA116]">LeetBoost</h1>
//           <button
//             onClick={toggleDarkMode}
//             className="w-12 h-12 bg-[#f3f3f3] dark:bg-[#363636] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
//           >
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 ${isDarkMode ? 'bg-[#282828] translate-x-0' : 'bg-white translate-x-2'}`}>
//               {isDarkMode ? (
//                 <Moon className="w-6 h-6 text-[#FFA116]" />
//               ) : (
//                 <Sun className="w-6 h-6 text-[#FFA116]" />
//               )}
//             </div>
//           </button>
//         </header>

//         <p className="text-sm leading-relaxed">
//           Your smart companion to crack coding interviews with ease.
//         </p>

//         <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
//           <Play className="w-5 h-5" />
//           <span>Start Boosting</span>
//         </button>

//         <div className="space-y-3">
//           <h2 className="font-semibold text-lg text-[#FFA116]">Why Use LeetBoost?</h2>
//           <ul className="text-sm space-y-2">
//             {[
//               "Analyze Code Complexity",
//               "Track Companies",
//               "Auto Cloud Sync",
//               "Push to GitHub",
//               "Comprehensive Insights",
//               "No Premium Required"
//             ].map((feature, index) => (
//               <li key={index} className="flex items-start">
//                 <svg className="w-5 h-5 text-[#FFA116] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <p className="text-sm italic text-center text-[#4CAF50] dark:text-[#69F0AE] font-medium">
//           Unlock productivity and efficiency like never before!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SidePanel;
