// import "./style.css"
// import {
//   ClerkProvider,
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   useUser
// } from "@clerk/chrome-extension"
// import { Moon, Sun } from 'lucide-react'
// import React, { useEffect, useState } from "react"

// const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
// const EXTENSION_URL = chrome.runtime.getURL(".")

// if (!PUBLISHABLE_KEY) {
//   throw new Error(
//     "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
//   )
// }

// const SidePanel = () => {
//   return (
//     <ClerkProvider
//       publishableKey={PUBLISHABLE_KEY}
//       afterSignOutUrl={`${EXTENSION_URL}/sidepanel.html`}
//       signInFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}
//       signUpFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}>
//       <SidePanelContent />
//     </ClerkProvider>
//   )
// }

// const SidePanelContent = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false)

//   useEffect(() => {
//     const isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
//     setIsDarkMode(isSystemDarkMode)
//     document.documentElement.classList.toggle("dark", isSystemDarkMode)
//   }, [])

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode)
//     document.documentElement.classList.toggle("dark")
//   }

//   return (
//     <div className="w-full h-full fixed top-0 left-0 z-50 font-sans bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] transition-colors duration-200">
//       <div className="p-6 space-y-6">
//         <header className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#FFA116]">LeetBoost</h1>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={toggleDarkMode}
//               className="w-16 h-8 bg-[#f3f3f3] dark:bg-[#363636] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
//               aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
//               <div
//                 className={`w-6 h-6 rounded-full flex items-center justify-center transform transition-all duration-300 ${
//                   isDarkMode ? "translate-x-8 bg-[#282828]" : "bg-white"
//                 }`}>
//                 {isDarkMode ? (
//                   <Moon className="w-4 h-4 text-[#FFA116]" />
//                 ) : (
//                   <Sun className="w-4 h-4 text-[#FFA116]" />
//                 )}
//               </div>
//             </button>
//             <SignedIn>
//               <UserButton
//                 afterSignOutUrl={`${EXTENSION_URL}/sidepanel.html`}
//                 userProfileMode="modal"
//                 userProfileUrl={`${EXTENSION_URL}/sidepanel.html`}
//                 appearance={{
//                   elements: {
//                     avatarBox: "w-8 h-8"
//                   }
//                 }}
//               />
//             </SignedIn>
//           </div>
//         </header>

//         <SignedIn>
//           <LoggedInContent />
//         </SignedIn>
//         <SignedOut>
//           <LoggedOutContent />
//         </SignedOut>
//       </div>
//     </div>
//   )
// }

// const LoggedOutContent = () => (
//   <>
//     <p className="text-sm leading-relaxed">
//       Your smart companion to crack coding interviews with ease.
//     </p>
//     <SignInButton mode="modal">
//       <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
//         Get Started
//       </button>
//     </SignInButton>
//     <div className="space-y-3">
//       <h2 className="font-semibold text-lg text-[#FFA116]">Why Use LeetBoost?</h2>
//       <ul className="text-sm space-y-2">
//         {[
//           "Analyze Code Complexity",
//           "Track Companies",
//           "Auto Cloud Sync",
//           "Push to GitHub",
//           "Comprehensive Insights",
//           "No Premium Required"
//         ].map((feature, index) => (
//           <li key={index} className="flex items-start">
//             <svg
//               className="w-5 h-5 text-[#FFA116] mr-2 mt-0.5 flex-shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"></path>
//             </svg>
//             {feature}
//           </li>
//         ))}
//       </ul>
//     </div>
//     <p className="text-sm italic text-center text-[#4CAF50] dark:text-[#69F0AE] font-medium">
//       Unlock productivity and efficiency like never before!
//     </p>
//   </>
// )

// const LoggedInContent = () => {
//   const { user } = useUser()
  
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <p className="text-lg font-medium">
//           Welcome back, {user?.firstName || user?.username || "User"}!
//         </p>
//       </div>
//       <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
//         <h2 className="font-semibold text-lg text-[#FFA116] mb-2">Your Progress</h2>
//         <div className="space-y-2">{}
//           <p>Problems Solved: 42</p>
//           <p>Current Streak: 7 days</p>
//           <p>Next Goal: Solve 50 problems</p>
//         </div>
//       </div>
//       <div>
//         <h2 className="font-semibold text-lg text-[#FFA116] mb-2">Recent Activity</h2>
//         <ul className="space-y-2">
//           <li>Solved "Two Sum" - Easy</li>
//           <li>Attempted "Merge K Sorted Lists" - Hard</li>
//           <li>Reviewed "Valid Parentheses" - Easy</li>
//         </ul>
//       </div>
//       <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
//         Continue Coding
//       </button>
//     </div>
//   )
// }

// export default SidePanel


import "./style.css"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/chrome-extension"
import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from "react"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const EXTENSION_URL = chrome.runtime.getURL(".")

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
  )
}

const SidePanel = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={`${EXTENSION_URL}/sidepanel.html`}
      signInFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}
      signUpFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}>
      <SidePanelContent />
    </ClerkProvider>
  )
}

const SidePanelContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(isSystemDarkMode)
    document.documentElement.classList.toggle("dark", isSystemDarkMode)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 font-sans bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] transition-colors duration-200">
      <div className="p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FFA116]">LeetBoost</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="w-16 h-8 bg-[#f3f3f3] dark:bg-[#363636] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transform transition-all duration-300 ${
                  isDarkMode ? "translate-x-8 bg-[#282828]" : "bg-white"
                }`}>
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-[#FFA116]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#FFA116]" />
                )}
              </div>
            </button>
            <SignedIn>
              <UserButton
                afterSignOutUrl={`${EXTENSION_URL}/sidepanel.html`}
                userProfileMode="modal"
                userProfileUrl={`${EXTENSION_URL}/sidepanel.html`}
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
          </div>
        </header>

        <SignedIn>
          <LoggedInContent />
        </SignedIn>
        <SignedOut>
          <LoggedOutContent />
        </SignedOut>
      </div>
    </div>
  )
}

const LoggedOutContent = () => (
  <>
    <p className="text-sm leading-relaxed">
      Your smart companion to crack coding interviews with ease.
    </p>
    <SignInButton mode="modal">
      <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
        Get Started
      </button>
    </SignInButton>
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
            <svg
              className="w-5 h-5 text-[#FFA116] mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
    <p className="text-sm italic text-center text-[#4CAF50] dark:text-[#69F0AE] font-medium">
      Unlock productivity and efficiency like never before!
    </p>
  </>
)

const LoggedInContent = () => {
  const { user } = useUser()
  const [userData, setUserData] = useState(null)
  const [recentSubmissions, setRecentSubmissions] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://leetcode-extension-cnwtrhdk9-pfgdanishs-projects.vercel.app/${user.username}/solved`)
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    const fetchRecentSubmissions = async () => {
      try {
        const response = await fetch(`https://leetcode-extension-cnwtrhdk9-pfgdanishs-projects.vercel.app/${user.username}/submission`)
        const data = await response.json()
        setRecentSubmissions(data.submission.slice(0, 4))
      } catch (error) {
        console.error('Error fetching recent submissions:', error)
      }
    }

    if (user?.username) {
      fetchUserData()
      fetchRecentSubmissions()
    }
  }, [user?.username])

  const calculateNextGoal = (solvedProblems) => {
    return Math.ceil((solvedProblems / 2.5)-10)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">
          Welcome back, {user?.firstName || user?.username || "User"}!
        </p>
      </div>
      {userData && (
        <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
          <h2 className="font-semibold text-lg text-[#FFA116] mb-2">Your Progress</h2>
          <div className="space-y-2">
            <p>Problems Solved: {userData.solvedProblem}</p>
            <p>Easy: {userData.easySolved} | Medium: {userData.mediumSolved} | Hard: {userData.hardSolved}</p>
            <p>Next Goal: Solve {calculateNextGoal(userData.solvedProblem)} problems in 10 days</p>
          </div>
        </div>
      )}
      <div>
        <h2 className="font-semibold text-lg text-[#FFA116] mb-2">Recent Activity</h2>
        <ul className="space-y-2">
          {recentSubmissions.map((submission, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{submission.title}</span>
              <span className={`text-sm ${submission.statusDisplay === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                {submission.statusDisplay}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
        Continue Coding
      </button>
    </div>
  )
}

export default SidePanel

