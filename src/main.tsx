import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-bg text-text h-screen flex flex-col overflow-hidden">
      <App />
    </div>
  </React.StrictMode>
);
