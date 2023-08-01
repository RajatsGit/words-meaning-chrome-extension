chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "selectWord") {
      chrome.tabs.executeScript(
        sender.tab.id,
        {
          code: `(${getSelectedWord})()`,
        },
        (result) => {
          sendResponse(result[0]);
        }
      );
      return true;
    }
  });
  
  function getSelectedWord() {
    return window.getSelection().toString().trim();
  }
  
  // Add any additional background service worker code here if needed
  