import { useParams } from "react-router-dom";
import ChatBasicInterface from "../../pages/chat/chatbasic/ChatBasicInterface";

const ChatIntefaceBasic = () => {
  const { chat_id } = useParams();

  return <ChatBasicInterface chat_id={chat_id} />;
};

export default ChatIntefaceBasic;
