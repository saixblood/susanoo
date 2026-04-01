# Fix All Code Bugs and Issues

## What & Why
The ZAO Facebook Messenger bot has multiple code bugs, security issues, and configuration errors that prevent it from working correctly. The bot is currently stuck in a crash-restart loop because of login failures and missing cookies. All identified issues need to be fixed comprehensively.

## Done looks like
- All identified code bugs are fixed (undeclared variables, typos, missing awaits, wrong method calls)
- The bot code is clean and can start without JavaScript errors
- Security-sensitive values (passwords, API keys) are moved to environment secrets
- Configuration typos are corrected
- The time format bugs are fixed
- The bot no longer crashes due to code-level errors (login/cookie issues depend on valid credentials being provided separately)

## Out of scope
- Obtaining new valid Facebook cookies (user must provide fresh ones)
- Rewriting or refactoring the overall architecture
- Adding new features
- Changing the FCA library itself

## Tasks
1. **Fix undeclared variables** — Add `var`/`let`/`const` to `commandName` in handleCommand.js, `singleData` in handleCreateDatabase.js, and fix `client.commands` to `global.client.commands` in handleCommand.js.

2. **Fix typos in code** — Correct `messengeID` to `messageID` in handleReply.js and handleCommandEvent.js. Fix time format `HH:MM:ss` to `HH:mm:ss` in handleCommand.js and handleEvent.js.

3. **Fix async/await bug** — Add missing `await` when calling the async DB controller in ZAO.js so threadsData/usersData/globalData are properly resolved.

4. **Fix wrong method call on object** — In ZAO.js events dependency loader, replace `global['nodemodule'].includes(pkgName)` with `global['nodemodule'].hasOwnProperty(pkgName)` since nodemodule is an object, not an array.

5. **Fix utils/index.js broken import** — Replace the missing `@miraipr0ject/assets` dependency with a safe fallback that won't crash the bot when utility functions are called.

6. **Fix ZAO-SETTINGS.json config errors** — Correct the `"autoAccept:"` key typo (remove colon from key name), clean up the empty strings in `commandDisabled` array.

7. **Move sensitive credentials to environment secrets** — Move EMAIL, PASSWORD, and API keys from ZAO-SETTINGS.json to Replit environment secrets so they are not stored in plain text in the codebase. Update the code to read from environment variables with fallback to config.

8. **Suppress unhandled rejection properly** — The unhandled rejection handler in ZAO.js silently swallows all errors; add minimal logging so real issues are visible.

## Relevant files
- `ZAO.js:125,152,279-310,389-407,907-909`
- `includes/handle/handleCommand.js:11,89,100`
- `includes/handle/handleReply.js:18`
- `includes/handle/handleCommandEvent.js:19`
- `includes/handle/handleEvent.js:7`
- `includes/handle/handleCreateDatabase.js:24`
- `utils/index.js:1`
- `ZAO-SETTINGS.json:59,31-38`
- `Main.js`
- `includes/Emalogin/index.js`
- `includes/login/autoRelogin.js`
