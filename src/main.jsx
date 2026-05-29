import React from "react";
import { createRoot } from "react-dom/client";
import AdvancedAssetManagementApp from "./App.jsx";
import "./style.css";

class AerizenErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.error("Aerizen render error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 32, fontFamily: "Segoe UI, Arial, sans-serif" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", background: "white", border: "1px solid #e2e8f0", borderRadius: 24, padding: 28, boxShadow: "0 16px 60px rgba(15,23,42,.08)" }}>
            <h1 style={{ margin: "0 0 12px", color: "#0f172a" }}>Aerizen gagal menampilkan halaman</h1>
            <p style={{ color: "#64748b", lineHeight: 1.7 }}>Ini bukan error installer. Ada error JavaScript di aplikasi. Screenshot halaman ini dan kirim ke developer.</p>
            <pre style={{ whiteSpace: "pre-wrap", background: "#0f172a", color: "#e2e8f0", padding: 18, borderRadius: 16, overflow: "auto" }}>{String(this.state.error?.stack || this.state.error)}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = "<h1 style='font-family:sans-serif;padding:32px'>Root element tidak ditemukan</h1>";
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AerizenErrorBoundary>
        <AdvancedAssetManagementApp />
      </AerizenErrorBoundary>
    </React.StrictMode>
  );
}
