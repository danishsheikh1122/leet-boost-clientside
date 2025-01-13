const GOOGLE_ORIGIN = 'https://www.google.com';

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return; // If there's no URL, do nothing

  const url = new URL(tab.url); // Parse the tab URL

  // If the tab's origin is google.com, enable the side panel
  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',  // Path to the side panel HTML that loads the React component
      enabled: true
    });
  } else {
    // Disable the side panel for all other URLs
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});
