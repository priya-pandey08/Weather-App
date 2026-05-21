# WEATHERLY

WEATHERLY is a simple static weather lookup app built with HTML, CSS, and vanilla JavaScript. It uses the OpenWeatherMap Current Weather Data API to display the current weather for any city and country.

## Files

- `index.html` — main app shell and form
- `styles.css` — minimalist responsive styling
- `script.js` — client-side weather lookup logic
- `weather.py` — separate Python script for Sydney weather (not required for the web app)

## Setup

1. Sign up for an OpenWeatherMap account and get a free API key.
2. Open `index.html` in a browser or host the files from GitHub Pages.
3. Enter the city name, country code or name, and your OpenWeatherMap API key.
4. Click **Get Weather** to see current conditions and metrics.

## API Key

- The app is fully static and does not hide secrets on the server.
- The API key is saved only in your browser storage when you click **Save API Key**.
- Do not commit your API key to the repository.
- For GitHub Pages, use a free-tier key with domain restrictions if available.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. In the repository settings, enable GitHub Pages from the `main` branch and the root folder.
3. The site will be available at `https://<your-username>.github.io/<repository-name>/`.

## Notes

- The app is designed to work without any build step.
- It handles invalid input, missing API keys, and API/network errors gracefully.
