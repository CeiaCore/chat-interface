import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ChatBasicRoute } from "./routes/basic/ChatBasic.route";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<ChatBasicRoute />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
