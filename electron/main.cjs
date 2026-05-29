const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

function findDistIndex() {
  const candidates = [
    path.join(app.getAppPath(), "dist", "index.html"),
    path.join(__dirname, "..", "dist", "index.html"),
    path.join(process.resourcesPath || "", "app", "dist", "index.html"),
    path.join(process.resourcesPath || "", "app.asar", "dist", "index.html"),
  ];

  for (const file of candidates) {
    try {
      if (file && fs.existsSync(file)) return file;
    } catch (_) {}
  }
  return { missing: candidates };
}

function errorHtml(title, details) {
  return `<!doctype html>
  <html><head><meta charset="utf-8" />
  <title>${title}</title>
  <style>
    body{margin:0;background:#f8fafc;font-family:Segoe UI,Arial,sans-serif;color:#0f172a;padding:40px}
    .card{max-width:980px;margin:auto;background:white;border:1px solid #e2e8f0;border-radius:24px;padding:28px;box-shadow:0 16px 60px rgba(15,23,42,.08)}
    h1{margin:0 0 12px;font-size:28px}.muted{color:#64748b;line-height:1.7}pre{white-space:pre-wrap;background:#0f172a;color:#e2e8f0;padding:18px;border-radius:16px;overflow:auto}
  </style></head><body><div class="card"><h1>${title}</h1><p class="muted">Aplikasi berhasil dibuka, tapi file tampilan belum bisa dimuat. Screenshot halaman ini dan kirimkan ke developer.</p><pre>${details}</pre></div></body></html>`;
}

function createWindow() {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1180,
    minHeight: 760,
    title: "Aerizen Asset Management",
    backgroundColor: "#f1f5f9",
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: true,
    },
  });

  win.setMenuBarVisibility(false);

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.on("did-finish-load", () => {
    win.setMenuBarVisibility(false);
  });

  win.webContents.on("did-fail-load", (_event, errorCode, errorDescription, validatedURL) => {
    const details = `did-fail-load\nCode: ${errorCode}\nDescription: ${errorDescription}\nURL: ${validatedURL}`;
    win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(errorHtml("Aerizen gagal memuat UI", details)));
  });

  win.webContents.on("render-process-gone", (_event, details) => {
    win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(errorHtml("Renderer crash", JSON.stringify(details, null, 2))));
  });

  win.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    console.log(`[renderer:${level}] ${message} (${sourceId}:${line})`);
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
    return;
  }

  const indexPath = findDistIndex();
  if (typeof indexPath === "string") {
    win.loadFile(indexPath).catch((error) => {
      win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(errorHtml("Aerizen gagal loadFile", String(error.stack || error))));
    });
  } else {
    win.loadURL(
      "data:text/html;charset=utf-8," +
        encodeURIComponent(errorHtml("dist/index.html tidak ditemukan", indexPath.missing.join("\n")))
    );
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
