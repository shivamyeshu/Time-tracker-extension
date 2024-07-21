document.addEventListener('DOMContentLoaded', () => {
  const timeDisplay = document.getElementById('time');
  const storageKey = "timeSpentToday";

  // Fetch stored time from Chrome storage
  chrome.storage.local.get([storageKey], (result) => {
    if (chrome.runtime.lastError) {
      timeDisplay.textContent = "Error loading data.";
      console.error(chrome.runtime.lastError);
      return;
    }

    let totalTime = result[storageKey] || 0;
    timeDisplay.textContent = formatTime(totalTime);
  });

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
});
