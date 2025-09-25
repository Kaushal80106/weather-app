
# Weather Chat — React + Vite

A small, friendly chat-style weather application built with React and Vite. The app lets users ask for weather information and displays concise results alongside chat messages and weather icons.

This README explains how to install, run, and extend the project locally on Windows (PowerShell examples included).

## Features

- Chat UI that accepts user input and shows a sequence of messages
- Fetches weather data from a weather API via `src/utils/fetchWeatherData.js`
- Components: message bubbles, typing indicator, input box, weather icons
- Built with React + Vite for fast development (HMR)

## Quick start (Windows PowerShell)

Prerequisites

- Node.js (16+ recommended) and npm or pnpm installed

Install dependencies

```powershell
npm install
```

Run in development mode

```powershell
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173) to view the app.

Build for production

```powershell
npm run build

# preview the production build locally
npm run preview
```

## Files and project structure

Key files (root)

- `index.html` — main HTML shell
- `package.json` — scripts & dependencies
- `vite.config.js` — Vite configuration

Source code (src/)

- `src/main.jsx` — app bootstrap
- `src/App.jsx` — top-level component and app wiring
- `src/index.css`, `src/App.css` — global and app styles

Components (src/Components)

- `ChatWindow.jsx` — container for the chat message list and UI
- `InputBox.jsx` — user input field and submit handling
- `MessageBubble.jsx` — individual chat message presentation
- `TypingIndicator.jsx` — shows when the app is 'typing' or fetching
- `WeatherIcon.jsx` — displays a weather icon for a given condition

Utilities

- `src/utils/fetchWeatherData.js` — fetches weather data from an API (replace API key / endpoint as needed)

Public assets

- `public/` — static assets served by Vite

## Development notes

- The app uses a simple client-side fetch in `fetchWeatherData.js`. For production apps you should move API keys to a secure backend or environment variables and avoid committing secrets.
- If you add environment variables for an API key, create a `.env` file and reference them via Vite (see Vite docs). Do not commit `.env` with secrets.

## How it works (quick)

1. User types a location or question in the `InputBox` and submits.
2. `ChatWindow` shows the user's message while `TypingIndicator` shows the app is fetching.
3. `fetchWeatherData.js` calls the weather API and returns a normalized result.
4. The app renders a response message and a `WeatherIcon` for the condition.

## Customization

- To switch weather providers or add parameters (units, language), update `src/utils/fetchWeatherData.js`.
- The UI is componentized — add or replace components inside `src/Components`.

## Contributing

1. Fork the repository
2. Create a branch (feature/your-feature)
3. Commit changes and open a PR with a brief description

Please keep changes small and focused. Add or update tests if you add logic beyond the UI.

## Troubleshooting

- If the dev server doesn't start, confirm Node.js and npm are on your PATH and try `npm ci` to cleanly install.
- Check the browser console for runtime errors — missing API keys or CORS issues are common when calling third-party APIs directly from the browser.

## License

This project doesn't include a license file by default. Add a `LICENSE` if you want to specify one.

---

If you want, I can also:

- Add a short example `.env.example` showing how to set an API key
- Wire a lightweight backend proxy to keep API keys secret
- Add a few unit tests for `fetchWeatherData.js`

Tell me which you'd like next and I will implement it.
