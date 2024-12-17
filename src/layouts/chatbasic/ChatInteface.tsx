import { useParams } from "react-router-dom";
import ChatBasicInterface, {
  ChatBasicInterfaceProps,
} from "../../pages/chat/chatbasic/ChatBasicInterface";

export interface ChatInterfaceBasicProps {
  LOGO_CHAT: string;
}

const ChatInteface = ({
  props: { LOGO_CHAT },
}: {
  props: ChatInterfaceBasicProps;
}) => {
  const { chat_id } = useParams();

  const chat_interface_props: ChatBasicInterfaceProps = {
    chat_id: chat_id,
    LOGO_CHAT: LOGO_CHAT,
  };

  return <ChatBasicInterface props={chat_interface_props} />;
};

export default ChatInteface;
