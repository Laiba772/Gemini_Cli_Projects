# Gemini Project: Live Cricket Dashboard

This document provides a comprehensive overview of the Live Cricket Dashboard project, its configuration, workflow, and the tools used for its development within the Gemini CLI environment.

## 1. Project Overview

The Live Cricket Dashboard is a web application designed to provide a real-time, visually appealing interface for tracking live cricket scores. The project is built with a Python Flask backend and a modern HTML, CSS, and JavaScript frontend.

The primary goal of the latest update was to significantly enhance the user interface with premium features like smooth animations, skeleton loaders, and dynamic score updates to create a "premium" feel.

## 2. Gemini CLI Configuration

### Core Technologies
- **Backend:** Python with the Flask framework (`app.py`).
- **Frontend:**
    - HTML5 (`templates/index.html`)
    - CSS3 (`static/style.css`)
    - JavaScript (ES6+) (`static/script.js`)
- **Dependency Management:** Flask's server handles template and static file rendering. No external package managers like npm were required for the frontend.

### Project Structure
- `app.py`: The main Flask application file. It serves the `index.html` template and provides the score data.
- `templates/`: Contains the HTML templates rendered by Flask.
  - `index.html`: The single-page view for the dashboard.
- `static/`: Contains all static assets served to the client.
  - `style.css`: The main stylesheet, responsible for all visual aspects, including animations, theming, and responsiveness.
  - `script.js`: The core JavaScript file that handles all client-side logic, including data injection, animations, theme switching, and simulated live updates.
- `gemini.md`: This file, containing project documentation and context for the Gemini agent.

## 3. Agents, Tools, and Commands

### Agent Role
The Gemini agent acts as a project assistant and developer. Its role is to understand user requests, analyze the existing codebase, and use its available tools to implement new features, fix bugs, and improve the application. In this project, the agent was tasked with upgrading the frontend UI.

### Tools Used
The following Gemini CLI tools were instrumental in modifying the project:
- `read_file`: Used to inspect the contents of `index.html`, `style.css`, and `script.js` to understand the existing implementation before making changes.
- `replace`: Used to modify existing code. This was key for updating CSS animations and JavaScript logic for score updates.
- `run_shell_command`: Used to execute commands in the shell, primarily to start the Flask application and verify the implemented changes.

### Key Commands
To run the live cricket dashboard locally, execute the following command from the project root directory:
```bash
# This command starts the Flask development server.
py app.py
```
*Note: Depending on the system configuration, `python app.py` or `python3 app.py` may be used instead.*

## 4. Application Workflow

The dashboard operates as a single-page application with a dynamic frontend that simulates real-time data updates.

### Backend Workflow
1.  The Flask server in `app.py` is started.
2.  When a user accesses the root URL (`/`), the server fetches a list of cricket scores.
3.  It then renders the `templates/index.html` file, passing the score data into a special `<template>` tag within the HTML. This keeps the data separate from the initial view structure.

### Frontend Workflow
1.  **Initial Load:** The browser loads `index.html`. The body is initially transparent and fades in for a smooth entry effect. Six "skeleton loader" cards are displayed by default, giving the user immediate visual feedback that content is loading.
2.  **Theme Initialization:** `script.js` runs and checks `localStorage` for a saved theme preference (dark or light) and applies it instantly.
3.  **Data Hydration & Animation:**
    - After a 1.5-second simulated delay (mimicking network latency), the script reads the score data from the hidden `<template id="scores-template">`.
    - It clears the skeleton loaders from the main container.
    - It then iterates through the score data, creates a "match card" for each match, and appends it to the dashboard.
    - Each new card is animated with a staggered **sliding animation**, appearing to enter from the left.
4.  **Live Score Simulation:**
    - A `setInterval` loop runs every 3 seconds to simulate a live score update.
    - Inside the loop, a random match card is selected.
    - The score is parsed, and a random number of runs is added.
    - The new score is animated with a **number count-up effect**.
    - Simultaneously, the score element receives a **glow effect** (`shimmer-update`) to draw the user's attention to the change.
5.  **User Interaction:**
    - The user can click the **dark/light mode toggle** at any time. The theme change is animated with a smooth transition of colors and backgrounds.

## 5. Key Concepts & Notes

-   **Decoupled Data with `<template>`:** The initial data from the backend is embedded in a non-rendered `<template>` element. This is a modern and efficient technique that allows the frontend to show a loading state (skeleton cards) first and then hydrate the UI with data without making a second API call.
-   **Simulated Live Environment:** The `simulateScoreUpdates` function in `script.js` provides a realistic demonstration of how the UI would behave in a live environment. It randomly updates scores and triggers the associated animations, showcasing the intended user experience.
-   **Modern CSS for Premium Feel:**
    -   **Glassmorphism:** The navbar and match cards use `backdrop-filter: blur()` to create a frosted glass effect.
    -   **Smooth Transitions & Animations:** All major UI changes—theme toggling, card entry, and score updates—are enhanced with custom CSS animations and transitions.
    -   **CSS Variables:** Theming for dark and light modes is managed efficiently using CSS custom properties.
-   **Responsive Design:** The dashboard uses a CSS Grid layout (`repeat(auto-fit, minmax(320px, 1fr))`) to ensure the layout is fully responsive and looks great on both desktop and mobile devices.
