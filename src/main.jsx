import { Provider } from "@/components/provider.jsx"
import { BrowserRouter  } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from "./App.jsx"

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
)