#!/usr/bin/env python3
"""Retrieve and display current weather for Sydney, Australia."""

import os
import sys

import requests


def get_api_key():
    """Read the OpenWeatherMap API key from the environment."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing OPENWEATHER_API_KEY environment variable. "
            "Set it in your environment or Codespaces secrets."
        )
    return api_key


def fetch_weather(api_key):
    """Call the OpenWeatherMap API and return JSON response data."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": "Sydney,AU",
        "appid": api_key,
        "units": "metric",
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    if "main" not in data or "weather" not in data:
        raise ValueError("Unexpected API response format.")
    return data


def format_weather(data):
    """Format temperature and weather conditions for display."""
    temperature = data["main"].get("temp")
    weather_items = data["weather"]
    if temperature is None or not weather_items:
        raise ValueError("Incomplete weather data returned by the API.")

    description = weather_items[0].get("description", "unknown").capitalize()
    return f"Sydney weather: {temperature:.1f}°C, {description}."


def main():
    """Main entry point for the weather script."""
    try:
        api_key = get_api_key()
        weather_data = fetch_weather(api_key)
        print(format_weather(weather_data))
    except EnvironmentError as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
    except requests.RequestException as error:
        print(f"Network error: {error}", file=sys.stderr)
        sys.exit(1)
    except ValueError as error:
        print(f"Data error: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
