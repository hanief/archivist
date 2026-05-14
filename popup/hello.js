async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

function archiveUrl(url) {
  return `https://archive.is/newest/${url}`;
}

(async () => {
  const tab = await getCurrentTab();

  document.getElementById("page-title").textContent = tab.title || tab.url;
  document.getElementById("page-url").textContent = tab.url;
  document.getElementById("favicon").src = `https://www.google.com/s2/favicons?domain=${new URL(tab.url).hostname}&sz=32`;

  document.getElementById("openBtn").addEventListener("click", () => {
    chrome.tabs.create({ url: archiveUrl(tab.url) });
  });

  document.getElementById("copyBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText(archiveUrl(tab.url));
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hidden");
    setTimeout(() => feedback.classList.add("hidden"), 2000);
  });
})();
