# ZAO Facebook Messenger Bot

## Overview
ZAO is a Facebook Messenger chatbot built in Node.js using the `@dongdev/fca-unofficial` FCA library. It supports modular commands and events, auto-login, SQLite database, and various automated features (auto-greet, auto-post, auto-bio, etc.).

## Architecture
- **Main.js** — Entry point: starts Express health-check server, spawns `ZAO.js` as child process with watchdog restart logic (up to 25 retries with exponential backoff)
- **ZAO.js** — Core bot logic: loads config, connects to DB, logs into Facebook via FCA, loads command/event modules, sets up message handling
- **includes/handle/** — Message/event handlers: `handleCommand.js`, `handleReply.js`, `handleEvent.js`, `handleCommandEvent.js`, `handleCreateDatabase.js`
- **includes/login/** — Login helpers: `autoRelogin.js` handles session recovery
- **includes/Emalogin/** — Email-based login fallback
- **SCRIPTS/commands/** — Bot command modules (each exports config + run function)
- **SCRIPTS/events/** — Bot event modules

## Configuration
- **ZAO-SETTINGS.json** — Bot settings (prefix, admin IDs, feature toggles, command-specific config). API keys are NOT stored here — they are read from environment secrets.
- **ZAO-STATE.json** — Facebook session cookies (appState)
- **fca-config.json** — FCA library configuration (auto-login, MQTT, API server)

## Environment Secrets (Required)
- `FB_EMAIL` — Facebook login email
- `FB_PASSWORD` — Facebook login password
- `YOUTUBE_API_KEY` — YouTube Data API key
- `WOLFRAM_API_KEY` — Wolfram Alpha API key
- `SAUCENAO_API_KEY` — SauceNAO reverse image search API key
- `OPENWEATHER_API_KEY` — OpenWeatherMap API key
- `SOUNDCLOUD_API_KEY` — SoundCloud API key
- `SIMSIMI_API_KEY` — SimSimi chatbot API key

## Key Dependencies
- `@dongdev/fca-unofficial` (local symlink from `fca-unofficial-main/`) — Facebook Chat API
- `express` — Health-check server on port 3000
- `sequelize` + `sqlite3` — Database ORM
- `axios` — HTTP requests
- `moment-timezone` — Time formatting

## Database
- SQLite stored at `data.sqlite`
- Models managed by Sequelize, auto-created on startup via `handleCreateDatabase.js`

## Running
- Workflow: `Start ZAO Bot` runs `node Main.js`
- Express serves on port 3000 (health check `/ping` endpoint)
- Bot requires valid Facebook cookies in `ZAO-STATE.json` (must include `c_user`, `xs` cookies)
