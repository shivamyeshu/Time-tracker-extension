let totalTime = 0;
let lastActiveTime = new Date().getTime();
const storageKey = "timeSpentToday";

// Check idle state every minute
chrome.idle.onStateChanged.addListener((newState) => {
  if (newState === "active") {
    lastActiveTime = new Date().getTime();
  } else if (newState === "idle" || newState === "locked") {
    const now = new Date().getTime();
    const timeSpent = now - lastActiveTime;
    totalTime += timeSpent;
    lastActiveTime = now;

    chrome.storage.local.set({ [storageKey]: totalTime });
  }
});

// Reset the time at midnight
function resetDailyTime() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const timeUntilMidnight = nextMidnight - now;

  setTimeout(() => {
    totalTime = 0;
    chrome.storage.local.set({ [storageKey]: totalTime });
    resetDailyTime();
  }, timeUntilMidnight);
}

resetDailyTime();
