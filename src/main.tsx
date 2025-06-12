import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← THÊM
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ← THÊM */}
      <App />
    </BrowserRouter> {/* ← THÊM */}
  </React.StrictMode>
);
