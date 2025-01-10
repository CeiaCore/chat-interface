import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { CustomRoute } from "./routes/custom/Custom.route";
import FirebaseProtectRoute from "./services/apis/auth/firebase/FirebaseProtectRoute";
import LoginA from "./pages/login/loginA/LoginA";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <FirebaseProtectRoute>
            <CustomRoute />
          </FirebaseProtectRoute>
        }
      />

      <Route path="/login" element={<LoginA />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
