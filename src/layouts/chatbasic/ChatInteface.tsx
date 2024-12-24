import { useParams } from "react-router-dom";
import ChatBasicInterface, {
  ChatBasicInterfaceProps,
} from "../../pages/chat/chatbasic/ChatBasicInterface";

export interface ChatInterfaceBasicProps {
  LOGO_CHAT: string;
  setOpenReference: (value: boolean) => void;
  openReference: boolean;
}

const ChatInteface = ({
  props: { LOGO_CHAT, openReference, setOpenReference },
}: {
  props: ChatInterfaceBasicProps;
}) => {
  const { chat_id } = useParams();

  const chat_interface_props: ChatBasicInterfaceProps = {
    chat_id: chat_id,
    LOGO_CHAT: LOGO_CHAT,
    openReference: openReference,
    setOpenReference: setOpenReference,
  };

  return <ChatBasicInterface props={chat_interface_props} />;
};

export default ChatInteface;
