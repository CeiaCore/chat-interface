import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { CustomRoute } from "./routes/custom/Custom.route";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<CustomRoute />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
