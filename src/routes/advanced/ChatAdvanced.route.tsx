import { Route, Routes } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";
import { ChatBasicProps } from "../../layouts/chatbasic/ChatBasic";
import { AuthProvider } from "../../context/AuthContext";
import {
  CARDS,
  HOME_BASIC_DESCRIPTION,
  HOME_BASIC_TITLE,
  LOGO,
  LOGO_CHAT,
} from "./ChatBasic.template.conf";
import ChatInteface, {
  ChatInterfaceBasicProps,
} from "../../layouts/chatbasic/ChatInteface";
import ChatAdvanced from "../../layouts/chatadvanced/ChatAdvanced";
import PersistentDrawerAdvanced from "../../components/drawer/advanced/PersistentDrawerAdvanced";
import { useState } from "react";
import GPTs from "../../pages/gpts/GPTs";
import FormGpt from "../../pages/gpts/form/FormGpt";

export function ChatAdvancedRoute() {
  const [openReference, setOpenReference] = useState(false);

  const chat_basic_props: ChatBasicProps = {
    CARDS: CARDS,
    HOME_BASIC_DESCRIPTION: HOME_BASIC_DESCRIPTION,
    HOME_BASIC_TITLE: HOME_BASIC_TITLE,
    LOGO: LOGO,
  };

  const chat_interface_props: ChatInterfaceBasicProps = {
    LOGO_CHAT: LOGO_CHAT,
    openReference: openReference,
    setOpenReference: setOpenReference,
  };

  return (
    <AuthProvider>
      <ChatProvider>
        <PersistentDrawerAdvanced
          openReference={openReference}
          setOpenReference={setOpenReference}
        >
          <Routes>
            <Route path="/gpts" element={<GPTs />} />
            <Route path="/gpts/edit" element={<FormGpt />} />

            <Route
              path="/"
              element={<ChatAdvanced props={chat_basic_props} />}
            />
            <Route
              path="/c/:chat_id"
              element={<ChatInteface props={chat_interface_props} />}
            />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </PersistentDrawerAdvanced>
      </ChatProvider>
    </AuthProvider>
  );
}
