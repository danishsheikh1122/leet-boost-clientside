import { useUser } from "@clerk/chrome-extension"
import { Activity } from "lucide-react"
import React, { useEffect, useState } from "react"

const ActivityComponent = () => {
  const [userData, setUserData] = useState(null)
  const [currentStreak, setCurrentStreak] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useUser()

  const calculateNextGoal = (solvedProblems) => {
    if (solvedProblems === 0) {
      return 5 // Set an initial goal if no problems are solved yet
    }

    const result = Math.ceil(solvedProblems / 2.5 - 10)
    return Math.max(result, 1) // Ensure the goal is at least 1
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://leetcode-extension-api.vercel.app/${user.username}/solved`
      )
      if (!response.ok) throw new Error("Failed to fetch user data")
      const data = await response.json()
      setUserData(data)
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError("Failed to load user data. Please try again later.")
    }
  }

  const fetchAndCalculateStreak = async () => {
    try {
      const response = await fetch(
        `https://leetcode-extension-api.vercel.app/${user.username}/calendar`
      )
      if (!response.ok) throw new Error("Failed to fetch submission calendar")
      const data = await response.json()

      const submissionCalendar = JSON.parse(data.submissionCalendar)

      const calculateStreak = (calendar) => {
        const timestamps = Object.keys(calendar)
          .map(Number)
          .sort((a, b) => b - a) // Sort in descending order (latest to oldest)

        let streak = 0 // Initialize streak to 0
        let currentDate = new Date() // Today's date
        currentDate.setHours(0, 0, 0, 0) // Normalize to midnight

        for (let timestamp of timestamps) {
          const submissionDate = new Date(timestamp * 1000) // Convert timestamp to date
          submissionDate.setHours(0, 0, 0, 0) // Normalize to midnight

          const diffInDays = (currentDate - submissionDate) / (1000 * 3600 * 24) // Difference in days

          if (diffInDays === 0) {
            // Submission on the same day
            streak++
          } else if (diffInDays === 1) {
            // Consecutive day submission
            streak++
          } else {
            // Missed a day, streak breaks
            break
          }

          // Update currentDate to the submission date
          currentDate = submissionDate
        }

        return streak
      }

      setCurrentStreak(calculateStreak(submissionCalendar))
    } catch (err) {
      console.error("Error fetching streak data:", err)
      setError("Failed to load streak data. Please try again later.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      await Promise.all([fetchUserData(), fetchAndCalculateStreak()])
      setIsLoading(false)
    }

    if (user?.username) fetchData()
  }, [user?.username])

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div className="bg-[#f3f3f3] dark:bg-[#363636] p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-[#FFA116] flex items-center">
            <Activity className="mr-2" /> Your Activity
          </h3>
          <div className="space-y-2">
            <p>
              Problems Solved:{" "}
              {isLoading ? (
                <span className="animate-pulse bg-gray-300 rounded w-24 h-4 inline-block"></span>
              ) : (
                userData?.solvedProblem
              )}
            </p>
            <p>
              {isLoading ? (
                <span className="animate-pulse bg-gray-300 rounded w-32 h-4 inline-block"></span>
              ) : (
                <>
                  Easy: {userData?.easySolved} | Medium:{" "}
                  {userData?.mediumSolved} | Hard: {userData?.hardSolved}
                </>
              )}
            </p>
            <p>
              {isLoading ? (
                <span className="animate-pulse bg-gray-300 rounded w-48 h-4 inline-block"></span>
              ) : (
                <>
                  Next Goal: Solve {calculateNextGoal(userData?.solvedProblem)}{" "}
                  problems in 10 days
                </>
              )}
            </p>
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-1">
            Current Streak
          </h4>
          <div className="bg-[#FFA116] text-white rounded-full w-14 h-14 flex items-center justify-center">
            <span className="text-lg font-bold">
              {isLoading ? (
                <span className="block w-6 h-6 rounded-full border-4 border-white border-t-[#FFA116] animate-spin"></span>
              ) : (
                currentStreak
              )}
            </span>
          </div>
          <p className="text-xs mt-1 font-medium">days</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityComponent
