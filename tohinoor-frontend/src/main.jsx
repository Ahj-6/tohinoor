import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TrackPageView from "./components/common/TrackPageView/TrackPageView.jsx";

import "./assets/styles/index.css";
import App from "./App.jsx";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      {/* <TrackPageView /> */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
