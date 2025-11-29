/* ---
CHANGELOG:
- Added theme manager to handle dark/light mode switching and persistence via localStorage.
- Implemented skeleton loading screen that is replaced by data after a simulated delay.
- Added staggered entrance animation for match cards.
- Created a `simulateScoreUpdates` function to mimic live data changes, applying a shimmer effect to a random card's score at regular intervals.
--- */

document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const dashboardContainer = document.getElementById('dashboard-container');
    const scoresTemplate = document.getElementById('scores-template');

    /**
     * ==============================================
     * THEME MANAGER
     * ==============================================
     * - Checks localStorage for a saved theme.
     * - Applies the saved theme or defaults to the system preference.
     * - Adds a listener to the toggle switch for changing themes.
     */
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /**
     * ==============================================
     * DYNAMIC DATA INJECTION & ANIMATIONS
     * ==============================================
     * - Clears the skeleton loader.
     * - Injects the real score data from the template.
     * - Applies staggered entrance animations to the cards.
     */
    const loadMatchCards = () => {
        // Clear the skeleton cards
        dashboardContainer.innerHTML = '';

        // Clone the content from the template and append it to the dashboard
        const templateContent = scoresTemplate.content.cloneNode(true);
        const cards = Array.from(templateContent.querySelectorAll('.match-card'));
        
        cards.forEach((card, index) => {
            // Apply staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            dashboardContainer.appendChild(card);
        });

        // Start simulating live score updates after cards are loaded
        setInterval(simulateScoreUpdates, 3000); // Check for updates every 3 seconds
    };

    /**
     * ==============================================
     * LIVE SCORE UPDATE ANIMATION
     * ==============================================
     * - Animates a number counting up from a start to an end value.
     * - Uses requestAnimationFrame for smooth rendering.
     */
    const animateScoreUpdate = (element, start, end, suffix) => {
        const duration = 750; // Animation duration in ms
        const range = end - start;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * range + start);
            element.textContent = `${current}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    /**
     * ==============================================
     * LIVE SCORE UPDATE SIMULATION
     * ==============================================
     * - Periodically selects a random match card to update.
     * - Parses the score, adds a random number of runs.
     * - Applies a shimmer animation and animates the score change.
     */
    const simulateScoreUpdates = () => {
        const cards = dashboardContainer.querySelectorAll('.match-card');
        if (cards.length === 0) return;

        // Select a random card to update
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const scoreEl = randomCard.querySelector('.score');

        if (scoreEl && !scoreEl.classList.contains('shimmer-update')) {
            // Add a shimmer effect
            scoreEl.classList.add('shimmer-update');

            // Simulate a score change
            try {
                let currentScoreText = scoreEl.textContent.trim();
                let [score, wickets] = currentScoreText.split('/');
                
                if (wickets && parseInt(wickets) < 10) {
                    const currentRuns = parseInt(score);
                    const newRuns = currentRuns + Math.floor(Math.random() * 6) + 1;
                    const suffix = `/${wickets}`;
                    animateScoreUpdate(scoreEl, currentRuns, newRuns, suffix);
                }
            } catch (e) {
                console.error("Could not parse score:", e);
            }

            // Remove the class after the animation completes
            setTimeout(() => {
                scoreEl.classList.remove('shimmer-update');
            }, 800); // Must match the animation duration in CSS
        }
    };

    /**
     * ==============================================
     * INITIALIZATION
     * ==============================================
     */
    initTheme();

    if (dashboardContainer && scoresTemplate) {
        // Use a timeout to simulate network latency and show off the skeleton loader.
        // In a real app, this would be replaced by a fetch() callback.
        setTimeout(loadMatchCards, 1500);
    }
});
