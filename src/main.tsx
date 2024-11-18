import { createRoot } from "react-dom/client";
import "./index.css";
// import KeycloakComponent from "./services/apis/auth/keycloak/keycloakComponent";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ChatIntefaceBasic from "./layouts/chatbasic/ChatInterfaceBasicTemplate";
import { ChatProvider } from "./context/ChatContext";
import ChatBasic from "./layouts/chatbasic/ChatBasic";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/*" element={<KeycloakComponent>teste</KeycloakComponent>} /> */}

      <Route
        path="/"
        element={
          <ChatProvider>
            <ChatBasic />
          </ChatProvider>
        }
      />

      <Route path="/c/:chat_id" element={<ChatIntefaceBasic />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
