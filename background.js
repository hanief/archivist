chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.create({
    url: `https://archive.is/newest/${tab.url}`
  });
});