import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-bg text-text h-dvh flex flex-col overflow-hidden relative">
      <App />
    </div>
  </React.StrictMode>
);
