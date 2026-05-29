# Aerizen Asset Management — EXE + Offline + Realtime

This project builds a Windows EXE with Electron.

Main features:

- Asset management dashboard
- Vehicle rental Excel import
- Work order module
- Offline local storage
- Supabase realtime sync between accounts
- Email/password login through Supabase Auth
- GitHub Actions workflow to build the Windows installer

## Build Windows EXE

Upload the project contents to GitHub, then run:

`Actions → Build Windows EXE → Run workflow`

Download the artifact named:

`Aerizen-Realtime-Windows-Installer`

## Realtime setup

Read `README_REALTIME_SETUP.md`.

## Supabase SQL

Run this file inside Supabase SQL Editor:

`supabase/schema.sql`

## Local development

```bash
npm install
npm run dev
```

For desktop dev:

```bash
npm run electron:dev
```
