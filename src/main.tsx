import { createRoot } from "react-dom/client";
import "./index.css";
import KeycloakComponent from "./services/apis/auth/keycloak/keycloakComponent";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { GenericRoutes } from "./routes/GenericRoute";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <AuthProvider>
            <KeycloakComponent>
              <GenericRoutes />
            </KeycloakComponent>
          </AuthProvider>
        }
      />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
