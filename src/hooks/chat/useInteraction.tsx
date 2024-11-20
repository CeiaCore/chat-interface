import { useContext } from "react";
import {
  ADD_MESSAGE_BOT,
  LOADING_GENERATE_LLM_FALSE,
} from "../../context/types/types";
import { EventSourcePolyfill } from "event-source-polyfill";
import { ContextChat } from "../../context/ChatContext";

interface interactProps {
  query: string;
  chat_id: string;
}
const URL = import.meta.env.VITE_URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

const useInteract = () => {
  const { dispatchChat } = useContext(ContextChat) || {};

  const interactChat = async ({ query, chat_id }: interactProps) => {
    if (!dispatchChat) {
      return null;
    }

    const url = `${URL}${PATH_DEFAULT}/stream?query=${encodeURIComponent(
      query
    )}&chat_id=${encodeURIComponent(chat_id)}`;

    const eventSource = new EventSourcePolyfill(url);

    let data = "";

    eventSource.onmessage = function (event) {
      const newMessage = event.data;
      if (newMessage !== ":\n\n") data += newMessage;

      dispatchChat({ type: ADD_MESSAGE_BOT, payload: data });
    };

    eventSource.onerror = function () {
      eventSource.close();

      dispatchChat({ type: LOADING_GENERATE_LLM_FALSE });
    };
  };
  return { interactChat };
};
export default useInteract;
