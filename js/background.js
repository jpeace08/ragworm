chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "close_tab") {
    // sender.tab.id là ID của tab đang gửi yêu cầu
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id);
    }
  }
});
