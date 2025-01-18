// this will open side bar only on leetcode.com
const LEETCODE_ORIGIN = "https://leetcode.com"

// Listen for tab updates to enable/disable the side panel
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return
  const url = new URL(tab.url)

  // Enable the side panel on leetcode.com
  if (url.origin === LEETCODE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html", // Path to the HTML file for the side panel
      enabled: true
    })
  } else {
    // Disable the side panel on other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    })
  }
})

// Allow users to open the side panel by clicking the extension icon MOST IMP

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));