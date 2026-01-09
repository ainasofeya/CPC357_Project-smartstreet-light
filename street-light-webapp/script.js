// script.js

/**
 * Updates the welcome greeting based on the time of day
 * and updates the digital clock in the status bar.
 */
function updateUI() {
    const now = new Date();
    const hour = now.getHours();
    
    const greetingEl = document.getElementById('greeting');
    const timeEl = document.getElementById('currentTime');
    
    // 1. Update Time
    if (timeEl) {
        timeEl.innerText = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // 2. Update Greeting
    if (greetingEl) {
        if (hour < 12) {
            greetingEl.innerText = "Good Morning!";
        } else if (hour < 18) {
            greetingEl.innerText = "Good Afternoon!";
        } else {
            greetingEl.innerText = "Good Evening!";
        }
    }
}

// Initial call
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    // Update every minute (60,000 milliseconds)
    setInterval(updateUI, 60000);
});