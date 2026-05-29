# Aerizen GitHub Build Fix

This version uses PNPM in GitHub Actions to avoid the npm Windows error:
`npm error Exit handler never called!`

Workflow file:
`.github/workflows/build-windows-exe.yml`

Build steps:
1. Upload the CONTENTS of this folder to GitHub root.
2. Go to Actions.
3. Run "Build Windows EXE".
4. Download artifact "Aerizen-Windows-EXE".

Do not upload the ZIP itself. Upload the files/folders inside the extracted folder.
