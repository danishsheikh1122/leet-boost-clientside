// Listen for a click event to open the side panel
const openSidePanelHandler = () => {
    chrome.sidePanel.open({ windowId: windowId });
  };
  
  // You can add the event listener to a specific element like a button
  document.querySelector("#open-side-panel-btn")?.addEventListener("click", openSidePanelHandler);
  