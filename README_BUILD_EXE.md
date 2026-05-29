# Build the Aerizen Windows EXE

1. Upload the contents of this folder to GitHub.
2. Make sure these paths are in the repository root:

```txt
.github/workflows/build-windows-exe.yml
electron/main.cjs
src/App.jsx
package.json
supabase/schema.sql
```

3. Open GitHub Actions.
4. Run **Build Windows EXE**.
5. Download **Aerizen-Realtime-Windows-Installer**.

The workflow uses:

```bash
npm install --include=dev --no-audit --no-fund
npx vite build
npx electron-builder --win nsis --x64 --publish never
```

`--publish never` prevents the GitHub token error.
