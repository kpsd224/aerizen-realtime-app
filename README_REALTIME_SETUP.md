# Aerizen EXE: Online + Offline + Realtime Setup

This project is an Electron Windows EXE app. It works offline with local browser storage and can sync realtime between two accounts using Supabase Free.

## 1. Create a free Supabase project

1. Open Supabase and create a new project.
2. Go to **SQL Editor**.
3. Open `supabase/schema.sql` from this project.
4. Copy all SQL and click **Run**.

## 2. Get Supabase credentials

In Supabase:

1. Go to **Project Settings** → **API**.
2. Copy **Project URL**.
3. Copy **anon public key**.

## 3. Build the EXE using GitHub Actions

Upload the project contents to GitHub, then run:

`Actions → Build Windows EXE → Run workflow`

Download artifact:

`Aerizen-Realtime-Windows-Installer`

## 4. Configure the installed app

Open the EXE. In the **Realtime Sync + Offline Mode** panel, paste:

- Supabase Project URL
- Supabase anon public key
- Workspace ID, for example `aerizen-main`

Click **Simpan Konfigurasi**.

## 5. Create two accounts and test realtime

On PC/account 1:

1. Click **Daftar Akun** or **Login**.
2. Add an asset.

On PC/account 2:

1. Use the same Supabase URL, anon key, and Workspace ID.
2. Login with another account.
3. Click **Sinkronkan Sekarang** once.
4. New changes should appear automatically when both users are online.

## Important behavior

- Offline input is saved locally.
- Offline changes enter a sync queue.
- When online again, click **Sinkronkan Sekarang** or wait for the auto-sync trigger.
- Realtime needs internet. Offline mode cannot send data to another account until internet returns.

## Security note

The included SQL policy is simple for internal testing: any authenticated user in your Supabase project can read/write the workspace data. Before production, create a stricter workspace/member table and RLS policies.
