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


// content.js - To detect when the specific div is loaded after a URL change

const checkForDiv = () => {
  // Select the main div containing the <a> tag
  const mainDiv = document.querySelector(
    '.text-title-large.font-semibold.text-text-primary.dark\\:text-text-primary'
  );

  if (mainDiv) {
    // Extract the <a> tag and its content
    const aTag = mainDiv.querySelector('a');
    let titleContent = aTag.textContent.trim(); // Trim spaces from the beginning and end
    const href = aTag.getAttribute('href'); // Get the href attribute

    // Remove everything before and including the first '.' in the title, and trim spaces
    titleContent = titleContent.substring(titleContent.indexOf('.') + 1).trim();

    // Alert when the div appears
    // alert("Title: " + titleContent); // Content after the dot
    // Optionally log the results
    // console.log("Title:", titleContent);
  }
};

// Listen to the `popstate` event which triggers when the URL changes in SPAs
window.addEventListener('popstate', () => {
  console.log('URL changed to:', window.location.href);
  checkForDiv(); // Check for the div after the URL change
});

// Optional: You can also listen to `pushState` or `replaceState` in case URL is updated without triggering `popstate`
const originalPushState = history.pushState;
history.pushState = function () {
  originalPushState.apply(this, arguments);
  console.log('URL changed to:', window.location.href);
  checkForDiv(); // Check for the div after the URL change
};

const originalReplaceState = history.replaceState;
history.replaceState = function () {
  originalReplaceState.apply(this, arguments);
  console.log('URL changed to:', window.location.href);
  checkForDiv(); // Check for the div after the URL change
};

// Initial check if the page is already on the right URL
checkForDiv();
