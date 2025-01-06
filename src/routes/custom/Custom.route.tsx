import { Route, Routes } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";
import PersistentDrawerLeft from "../../components/drawer/PersistentDrawerLeft";
import { AuthProvider } from "../../context/AuthContext";
import HomeB from "../../pages/home/homeB/HomeB";
import { HomeBConfig } from "./config/home/HomeB.config";
import { CustomConfig } from "./Custom.config";
import { useState } from "react";
import Teste from "./Teste";
import ChatInteface, {
  ChatInterfaceBasicProps,
} from "../../layouts/chatbasic/ChatInteface";

export function CustomRoute() {
  const config = CustomConfig;
  const [openReference, setOpenReference] = useState(false);

  const chat_interface_props: ChatInterfaceBasicProps = {
    LOGO_CHAT: "LOGO_CHAT",
    openReference: openReference,
    setOpenReference: setOpenReference,
  };

  return (
    <AuthProvider>
      <ChatProvider>
        <PersistentDrawerLeft>
          <Routes>
            {config.home === "HomeB" && (
              <Route path="/" element={<HomeB home_config={HomeBConfig} />} />
            )}
            <Route path="/teste" element={<Teste />} />

            <Route
              path="/c/:chat_id"
              element={<ChatInteface props={chat_interface_props} />}
            />

            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </PersistentDrawerLeft>
      </ChatProvider>
    </AuthProvider>
  );
}
