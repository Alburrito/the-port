import { StrictMode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter  } from "react-router-dom";

import { Provider } from "@/components/provider.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);