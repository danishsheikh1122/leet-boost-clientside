// // whatever link will be used the extension is restricted to it self only and change it as u want 
// const GOOGLE_ORIGIN = 'https://www.leetcode.com';

// // Enable the side panel on google.com and disable it on other sites
// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);

//   // Enable the side panel only on google.com
//   if (url.origin === GOOGLE_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   } else {
//     // Disable the side panel on other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });

// // Allows users to open the side panel by clicking the toolbar icon
// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'open_side_panel') {
      // Open the side panel using Chrome's sidePanel API
      chrome.sidePanel.open({
        path: 'sidepanel.html'  // Path to the side panel content
      });
    }
  });
  