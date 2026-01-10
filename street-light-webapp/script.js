import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAAfJWD_IwDQow93rcP-L_0a5oY9ZNtQgU",
  authDomain: "optimal-tea-481701-t2.firebaseapp.com",
  projectId: "optimal-tea-481701-t2",
  storageBucket: "optimal-tea-481701-t2.firebasestorage.app",
  messagingSenderId: "379052210100",
  appId: "1:379052210100:web:483f5c002c9007c88424e1",
  measurementId: "G-RFTYZG4GBN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {

  const statusElement = document.getElementById("systemStatus");
  const modeElement = document.getElementById("currentMode");
  const networkElement = document.getElementById("networkStatus");
  const timeElement = document.getElementById("currentTime");

  const systemRef = ref(db, "system");

  onValue(systemRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) return;

    const lastSeen = data.last_seen || 0;
    const now = Math.floor(Date.now() / 1000);

    const isOnline = (now - lastSeen) < 60;

    // Always show last known values
    modeElement.innerText = data.mode || "N/A";

    const date = new Date(lastSeen * 1000);
    timeElement.innerText = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    if (isOnline) {
      statusElement.innerText = "● Active";
      statusElement.style.color = "#2ecc71";

      networkElement.innerText = "Cloud Connected";
      networkElement.style.color = "#2ecc71";
      networkElement.style.opacity = "1";
    } else {
      statusElement.innerText = "● Inactive";
      statusElement.style.color = "#e74c3c";

      networkElement.innerText = "Offline (Last Known Data)";
      networkElement.style.color = "#e74c3c";
      networkElement.style.opacity = "0.7";
    }
  });

  // Detect browser network too
  window.addEventListener("offline", () => {
    networkElement.innerText = "No Internet Connection";
    networkElement.style.color = "#e74c3c";
  });

  window.addEventListener("online", () => {
    networkElement.innerText = "Reconnecting...";
    networkElement.style.color = "#f1c40f";
  });

});
