import { Route, Routes } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";
import PersistentDrawerLeft from "../../components/drawer/PersistentDrawerLeft";
import ChatBasic, { ChatBasicProps } from "../../layouts/chatbasic/ChatBasic";
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

export function ChatBasicRoute() {
  const chat_basic_props: ChatBasicProps = {
    CARDS: CARDS,
    HOME_BASIC_DESCRIPTION: HOME_BASIC_DESCRIPTION,
    HOME_BASIC_TITLE: HOME_BASIC_TITLE,
    LOGO: LOGO,
  };

  const chat_interface_props: ChatInterfaceBasicProps = {
    LOGO_CHAT: LOGO_CHAT,
  };

  return (
    <AuthProvider>
      <ChatProvider>
        <PersistentDrawerLeft>
          <Routes>
            <Route path="/" element={<ChatBasic props={chat_basic_props} />} />
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
