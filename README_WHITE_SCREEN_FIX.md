# Blank / White Screen Fix

This project has been fixed for Electron packaged builds.

The blank screen happened because Vite built JavaScript/CSS with absolute paths like `/assets/...`.
Inside an installed Electron app, the page loads with `file://`, so `/assets/...` points to the wrong place.

Fixes included:

- `vite.config.js` with `base: "./"`
- Electron now loads `dist/index.html` using `app.getAppPath()`
- App version bumped to `1.0.1`
- Default Electron menu removed for a cleaner UI

Build again in GitHub Actions, download the new EXE, then install the new version.
