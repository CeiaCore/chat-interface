import { Route, Routes } from "react-router-dom";
import ChatIntefaceBasic from "../layouts/chatbasic/ChatInterfaceBasicTemplate";
import ChatBasic from "../layouts/chatbasic/ChatBasic";
import { ChatProvider } from "../context/ChatContext";
import PersistentDrawerLeft from "../components/drawer/PersistentDrawerLeft";
import { useEffect } from "react";

export function GenericRoutes() {
  //   const { dispatchChat } = useContext(ContextChat) || {};
  useEffect(() => {
    document.title =
      "Enap - Escola Nacional de Administração Pública - Chatbot";
  }, []);
  return (
    <ChatProvider>
      <PersistentDrawerLeft>
        <Routes>
          <Route path="/" element={<ChatBasic />} />
          <Route path="/c/:chat_id" element={<ChatIntefaceBasic />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </PersistentDrawerLeft>
    </ChatProvider>
  );
}
