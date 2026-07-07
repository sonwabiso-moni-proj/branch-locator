import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { USE_MOCK_SERVICE } from "./config/env";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

async function enableMocking() {
  if (!USE_MOCK_SERVICE) {
    console.log("🟢 Using real API");
    return;
  }

  console.log("🟡 USING MOCK SERVICE (Branch Locator)");

const { worker } = await import("./api/service/mock/branchLocatorService");
  await worker.start({
    onUnhandledRequest: "warn",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});