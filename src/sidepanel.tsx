// this is fully working code
import "./style.css"

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/chrome-extension"
import { Button } from "@mantine/core"
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Code,
  Github,
  Moon,
  Sun
} from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"

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
  const [status, setStatus] = useState("Waiting for submission details...")
  const [code, setCode] = useState("")
  const [result, setResult] = useState("")
  const [language, setLanguage] = useState("")
  const [submissionId, setSubmissionId] = useState(null)
  const [submissionStatus, setSubmissionStatus] = useState(
    "Waiting for submission details..."
  )
  const [submissionCode, setSubmissionCode] = useState("")
  const [submissionLanguage, setSubmissionLanguage] = useState("")
  const [bigOResult, setBigOResult] = useState("")
  const [toggleCode, setToggleCode] = useState("")
  const checkAcceptedText = useCallback(() => {
    const acceptedText = document.querySelector(
      'span[data-e2e-locator="submission-result"]'
    )

    if (acceptedText && acceptedText.textContent.trim() === "Accepted") {
      console.log("Accepted text is now visible")
      fetchSubmissionDetails()
    }
  }, [])
  // logic to toggle between recent submission and big-o page
  const togglepage = () => {
    setSubmissionCode("")
  }

  const tosubmission = () => {
    setSubmissionCode(toggleCode)
  }

  // ends

  const fetchSubmissionDetails = useCallback(() => {
    const urlString = window.location.href
    const match = urlString.match(/\/submissions\/(\d+)/)

    if (match && match[1]) {
      const submissionId = parseInt(match[1], 10)
      console.log("Extracted submissionId:", submissionId)
      setSubmissionId(submissionId)

      const query = `
        query submissionDetails($submissionId: Int!) {
          submissionDetails(submissionId: $submissionId) {
            code
            lang {
              name
              verboseName
            }
          }
        }
      `
      const variables = { submissionId }
      const url = "https://leetcode.com/graphql/"
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "User-Agent": navigator.userAgent
      }
      const body = JSON.stringify({
        query,
        variables,
        operationName: "submissionDetails"
      })

      fetch(url, { method: "POST", headers, body })
        .then((response) => response.json())
        .then((data) => {
          if (data.data?.submissionDetails) {
            const { code, lang } = data.data.submissionDetails
            console.log("Extracted Code:", code)
            console.log("Programming Language:", lang.verboseName)
            setCode(code)
            setLanguage(lang.verboseName)
            postToBigOCalcEndpoint(code, lang.verboseName, submissionId, code)
          } else {
            console.error("Details not found in response")
            setStatus("Failed to fetch submission details")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          setStatus("Error fetching submission details")
        })
    } else {
      console.error("No valid submissionId found in the URL")
      setStatus("No valid submission ID found")
    }
  }, [])

  const postToBigOCalcEndpoint = useCallback(
    (code, language, submissionId, submissionCode) => {
      const endpointUrl = "https://daleseo-bigocalc.web.val.run"
      const requestBody = JSON.stringify({ code, lang: language })
      const headers = {
        "Content-Type": "application/json"
      }

      fetch(endpointUrl, { method: "POST", headers, body: requestBody })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from BigO Calc Endpoint:", data)
          setResult(data.result || "Big-O result not available")
          setStatus(`Submission ${submissionId} Accepted!`)
        })
        .catch((error) => {
          console.error("Error posting to BigO Calc endpoint:", error)
          setResult("Error calculating Big-O complexity")
        })
    },
    []
  )

  useEffect(() => {
    const isSystemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    setIsDarkMode(isSystemDarkMode)
    document.documentElement.classList.toggle("dark", isSystemDarkMode)

    const observer = new MutationObserver(() => checkAcceptedText())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [checkAcceptedText])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "updatePopup") {
        const { submissionId, submissionCode, result, language } = message

        if (submissionId && submissionCode) {
          setSubmissionStatus(`Submission ${submissionId} Accepted!`)
          setSubmissionCode(submissionCode)
          setToggleCode(submissionCode)
        } else {
          setSubmissionStatus("No recent submission found.")
        }

        if (language) {
          setSubmissionLanguage(`Language: ${language}`)
        } else {
          setSubmissionLanguage("Language: Not available")
        }

        if (result) {
          if (typeof result === "object" && result.result) {
            setBigOResult(result.result)
          } else {
            setBigOResult("Big-O result not available")
          }
        } else {
          setBigOResult("Big-O result not available")
        }
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const BigOResult = ({ complexity }) => {
    if (!complexity) return null

    const highlightComplexity = (text) => {
      return text.replace(
        /O$$[^)]+$$/g,
        (match) => `<span class="text-[#FFA116] font-bold">${match}</span>`
      )
    }

    return (
      <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-xl text-[#FFA116] mb-2 flex items-center">
          <Code className="mr-2" /> Big O Analysis
        </h3>
        <p
          className="text-lg mb-2"
          dangerouslySetInnerHTML={{
            __html: highlightComplexity(
              `Time Complexity: ${complexity.time_complexity}`
            )
          }}
        />
        <p
          className="text-lg mb-2"
          dangerouslySetInnerHTML={{
            __html: highlightComplexity(
              `Space Complexity: ${complexity.space_complexity}`
            )
          }}
        />
        {complexity.explanation && (
          <p className="text-sm mt-2">{complexity.explanation}</p>
        )}
      </div>
    )
  }

  const LoggedInContent = () => {
    const { user } = useUser()
    const [userData, setUserData] = useState(null)
    const [recentSubmissions, setRecentSubmissions] = useState([])
    const [codeComplexity, setCodeComplexity] = useState(null)

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://leetcode-extension-cnwtrhdk9-pfgdanishs-projects.vercel.app/${user.username}/solved`
          )
          const data = await response.json()
          setUserData(data)
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }

      const fetchRecentSubmissions = async () => {
        try {
          const response = await fetch(
            `https://leetcode-extension-cnwtrhdk9-pfgdanishs-projects.vercel.app/${user.username}/submission`
          )
          const data = await response.json()
          setRecentSubmissions(data.submission.slice(0, 4))
        } catch (error) {
          console.error("Error fetching recent submissions:", error)
        }
      }

      if (user?.username) {
        fetchUserData()
        fetchRecentSubmissions()
      }

      const handleMessage = (message) => {
        if (message.action === "updatePopup" && message.result) {
          const complexityResult =
            typeof message.result === "string"
              ? JSON.parse(message.result)
              : message.result
          setCodeComplexity(complexityResult)
        }
      }

      chrome.runtime.onMessage.addListener(handleMessage)

      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage)
      }
    }, [user?.username])

    const calculateNextGoal = (solvedProblems) => {
      return Math.ceil(solvedProblems / 2.5 - 10)
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#FFA116]">
            Welcome back, {user?.firstName || user?.username || "User"}!
          </h2>
        </div>

        <BigOResult complexity={codeComplexity} />

        {userData && (
          <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-[#FFA116] mb-2 flex items-center">
              <Activity className="mr-2" /> Your Activity
            </h3>
            <div className="space-y-2">
              <p>Problems Solved: {userData.solvedProblem}</p>
              <p>
                Easy: {userData.easySolved} | Medium: {userData.mediumSolved} |
                Hard: {userData.hardSolved}
              </p>
              <p>
                Next Goal: Solve {calculateNextGoal(userData.solvedProblem)}{" "}
                problems in 10 days
              </p>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg text-[#FFA116] mb-2 flex items-center">
            <ChevronRight className="mr-2" /> Recent Activity
          </h3>
          <ul className="space-y-2 bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
            {recentSubmissions.map((submission, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="truncate flex-1 mr-2">{submission.title}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    submission.statusDisplay === "Accepted"
                      ? "bg-green-100 text-green-600 rounded-lg dark:bg-green-600 dark:text-green-100"
                      : "bg-red-100 text-red-600 rounded-lg dark:bg-red-600 dark:text-red-100"
                  }`}>
                  {submission.statusDisplay}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-[#FFA116] mb-2 ml-2 flex items-center">
            <span className="mr-2">θ</span>Current Submission Analysis
          </h3>
          <div className=" bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg space-y-4 flex flex-col">
            {/* yet to add functionality to extract tc and sc from the para and show below */}
            <span>Time Complexity:</span>
            <span>Space Complexity:</span>
            <button
              onClick={tosubmission}
              className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
              {submissionCode ? (
                <>"Go to submission" {chrome.runtime.reload()}</>
              ) : (
                "Check analysis(make one submission first)"
              )}
            </button>
          </div>
        </div>
        

        <div>
          <h3 className="font-semibold text-lg text-[#FFA116] mb-2 ml-2 flex items-center">
            <span className="mr-2"><Github></Github></span>Sync to Github
          </h3>
          <div className=" bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg space-y-4 flex flex-col">
            <button
              onClick={tosubmission}//github sync funciton name comes here
              className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
            </button>
          </div>
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
        <h2 className="font-semibold text-lg text-[#FFA116]">
          Why Use LeetBoost?
        </h2>
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

  const SubmissionDetails = ({ status, code, language, result }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#FFA116]">Submission Details</h2>
      <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
        {/* <p>
          <strong>Status:</strong> {status}
        </p> */}
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
      {/* <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Code:</h3>
        <pre className="whitespace-pre-wrap overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div> */}
      <button
        onClick={togglepage}
        className="w-full bg-[#FFA116] hover:bg-[#FFB84D] text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#FFA116] focus:ring-opacity-50">
        Go Back
      </button>
    </div>
  )

  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 font-sans bg-white dark:bg-[#282828] text-[#263238] dark:text-[#e6e6e6] transition-colors duration-200 overflow-hidden">
      <div className="p-6 space-y-6 h-full overflow-y-auto">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FFA116]">LeetBoost</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="w-16 h-8 bg-[#f3f3f3] dark:bg-[#363636] rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFA116]"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }>
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
          {submissionCode ? (
            <SubmissionDetails
              status={submissionStatus}
              code={submissionCode}
              language={submissionLanguage}
              result={bigOResult}
            />
          ) : (
            <LoggedInContent />
          )}
        </SignedIn>
        <SignedOut>
          <LoggedOutContent />
        </SignedOut>
      </div>
    </div>
  )
}

export default SidePanel
