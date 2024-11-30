import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

document.body.style.margin = 0;
document.body.style.padding = 0;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
