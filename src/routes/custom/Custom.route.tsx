import { Route, Routes } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";
import PersistentDrawerLeft from "../../components/drawer/PersistentDrawerLeft";
import { AuthProvider } from "../../context/AuthContext";
import HomeB from "../../pages/home/homeB/HomeB";
import { HomeBConfig } from "./config/home/HomeB.config";
import { CustomConfig } from "./Custom.config";
import { useState } from "react";
import ChatInteface, {
  ChatInterfaceBasicProps,
} from "../../layouts/chatbasic/ChatInteface";
import ChatBoxWithMock from "./Teste";
import PersistentDrawerAdvanced from "../../components/drawer/advanced/PersistentDrawerAdvanced";
import GPTs from "../../pages/gpts/GPTs";
import FormGpt from "../../pages/gpts/form/FormGpt";
import FirebaseProtectRoute from "../../services/apis/auth/firebase/FirebaseProtectRoute";
import { useHandleLogoutFirebase } from "../../services/apis/auth/firebase/HandleLogout";
import HomeKnowledge from "../../pages/home/homeKnowledge/HomeKnowledge";

export function CustomRoute() {
  const config = CustomConfig;
  const [openReference, setOpenReference] = useState(false);
  const { handleLogout } = useHandleLogoutFirebase();

  const chat_interface_props: ChatInterfaceBasicProps = {
    LOGO_CHAT: "LOGO_CHAT",
    openReference: openReference,
    setOpenReference: setOpenReference,
  };

  return (
    <AuthProvider>
      <FirebaseProtectRoute>
        <ChatProvider>
          <PersistentDrawerAdvanced
            openReference={openReference}
            setOpenReference={setOpenReference}
            handleLogout={handleLogout}
          >
            <Routes>
              <Route path="/gpts" element={<GPTs />} />
              <Route
                path="/gpts/edit/:session_id"
                element={
                  <FormGpt
                    openReference={openReference}
                    setOpenReference={setOpenReference}
                  />
                }
              />
              {config.home === "HomeB" && (
                <Route path="/" element={<HomeB home_config={HomeBConfig} />} />
              )}
              <Route path="/teste" element={<ChatBoxWithMock />} />

              <Route
                path="/c/:chat_id"
                element={<ChatInteface props={chat_interface_props} />}
              />

              <Route path="/g/:knowledge_id" element={<HomeKnowledge />} />

              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </PersistentDrawerAdvanced>
        </ChatProvider>
      </FirebaseProtectRoute>
    </AuthProvider>
  );
}
