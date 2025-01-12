import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { CustomRoute } from "./routes/custom/Custom.route";

import LoginA from "./pages/login/loginA/LoginA";
import { useHandleLoginFirebase } from "./services/apis/auth/firebase/HandleLogin";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomRoute />} />

        <Route path="/login" element={<AuthMiddleware />} />
      </Routes>
    </BrowserRouter>
  );
}

const AuthMiddleware = () => {
  const { handleLogin, loading, message } = useHandleLoginFirebase();

  return (
    <LoginA handleLogin={handleLogin} isLoading={loading} message={message} />
  );
};

createRoot(document.getElementById("root")!).render(<Main />);
