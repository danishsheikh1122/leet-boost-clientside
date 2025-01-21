// Listen for a click event to open the side panel
const openSidePanelHandler = () => {
  chrome.sidePanel.open({ windowId: windowId })
}

// You can add the event listener to a specific element like a button
document
  .querySelector("#open-side-panel-btn")
  ?.addEventListener("click", openSidePanelHandler)
// In content.js
;(function () {
  const observeButtonAndAttachListener = () => {
    const observer = new MutationObserver(() => {
      const submitButton = document.querySelector(
        'button[data-e2e-locator="console-submit-button"]'
      )
      if (submitButton) {
        console.log("Submit button detected")
        attachClickListener(submitButton)
        observer.disconnect() // Stop observing once the button is found
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  const attachClickListener = (submitButton) => {
    submitButton.addEventListener("click", () => {
      console.log("Submit button clicked")
      waitForAcceptedText() // Trigger check after button is clicked
    })
  }

  const waitForAcceptedText = () => {
    const checkAcceptedText = () => {
      const acceptedText = document.querySelector(
        'span[data-e2e-locator="submission-result"]'
      )
      if (acceptedText && acceptedText.textContent.trim() === "Accepted") {
        console.log("Accepted text detected")
        fetchSubmissionDetails()
        observer.disconnect() // Stop observing for changes
      }
    }

    const observer = new MutationObserver(() => checkAcceptedText())
    observer.observe(document.body, { childList: true, subtree: true })
  }

  const fetchSubmissionDetails = () => {
    const urlString = window.location.href
    const match = urlString.match(/\/submissions\/(\d+)/)

    if (match && match[1]) {
      const submissionId = parseInt(match[1], 10)
      console.log("Extracted submissionId:", submissionId)

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

            postToBigOCalcEndpoint(code, lang.verboseName, submissionId, code)
          } else {
            console.error("Details not found in response")
          }
        })
        .catch((error) => console.error("Error:", error))
    } else {
      console.error("No valid submissionId found in the URL")
    }
  }

  const postToBigOCalcEndpoint = (
    code,
    language,
    submissionId,
    submissionCode
  ) => {
    const endpointUrl = "https://daleseo-bigocalc.web.val.run"
    const requestBody = JSON.stringify({ code, lang: language })
    const headers = {
      "Content-Type": "application/json"
    }

    fetch(endpointUrl, { method: "POST", headers, body: requestBody })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from BigO Calc Endpoint:", data)

        chrome.runtime.sendMessage({
          action: "updatePopup",
          submissionId: submissionId,
          submissionCode: submissionCode,
          language: language,
          result: data
        })
      })
      .catch((error) =>
        console.error("Error posting to BigO Calc endpoint:", error)
      )
  }

  // Start observing for the submit button
  observeButtonAndAttachListener()
})()





// code for observing the question name changed, as soon as the div with specifed text appears, it will alert the question namethe alert will prompt

function extractProblemName() {
  // Get the current URL
  const currentUrl = window.location.href

  // Use a regular expression to extract the part after "/problems/"
  const regex = /\/problems\/([^/]+)/
  const match = currentUrl.match(regex)

  // If a match is found, extract the problem name
  if (match && match[1]) {
    let problemName = match[1].replace(/-/g, " ") // Replace hyphens with spaces

    // Trim any leading or trailing whitespace
    problemName = problemName.trim()
    // alert(problemName)
    // If a valid problem name exists, make the API call
    if (problemName) {
      const apiUrl = `https://leet-code-extension-companydata.vercel.app/companyInfoStats?title=${problemName}`

      // Make the API call using fetch
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Log the response data to the console
          console.log("API Response:", data.company)

          chrome.runtime.sendMessage({
            action: "sendCompanyNames",
            result: data.company
          })
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    } else {
      console.log("Problem name is empty after cleaning.")
    }
  } else {
    console.log("No problem in URL")
  }
}

// Listen for changes in the URL (when the page is navigated to a new problem)
window.addEventListener("popstate", extractProblemName)

// Extract the problem name when the script is first loaded

setInterval(() => {
  extractProblemName()
}, 20000)