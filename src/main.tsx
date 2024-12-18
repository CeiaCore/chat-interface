import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ChatBasicRoute } from "./routes/basic/ChatBasic.route";
import { ChatAdvancedRoute } from "./routes/advanced/ChatAdvanced.route";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<ChatAdvancedRoute />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
