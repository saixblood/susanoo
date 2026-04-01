---
title: Fix side code bugs in ZAO bot
---
# Fix Side Code Bugs in ZAO Bot

## What & Why
Three non-critical code issues were found during inspection that need fixing: a syntax error preventing a command from loading, a missing config value causing logic errors, and an async check that doesn't block startup properly.

## Done looks like
- The "تكرار" (نكرار.js) command loads and works without errors
- The "محرك2" (motor2.js) command correctly identifies bot messages using BOTID from config
- The GBAN check completes before the bot loads commands, preventing a banned bot from starting

## Out of scope
- Facebook login/cookie issues (not to be touched)
- Any changes to the login flow or credential handling

## Tasks
1. **Fix syntax error in نكرار.js** — Remove the stray unquoted Arabic text and markdown formatting (lines 81-87) at the end of the file that prevents the module from loading.

2. **Add BOTID to config and motor2.js fallback** — Add the `BOTID` field to `ZAO-SETTINGS.json` and update `motor2.js` to fall back to the bot's own user ID if `BOTID` is not set.

3. **Make GBAN check blocking** — Convert the async IIFE GBAN check in `ZAO.js` so it completes before the bot continues loading commands, with a try-catch so network failures don't crash the bot.

## Relevant files
- `SCRIPTS/ZAO-CMDS/نكرار.js:80-87`
- `SCRIPTS/ZAO-CMDS/motor2.js:26`
- `ZAO-SETTINGS.json`
- `ZAO.js:160-171`