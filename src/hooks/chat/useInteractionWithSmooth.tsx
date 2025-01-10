import { useContext } from "react";
import {
  ADD_MESSAGE_BOT,
  ADD_MESSAGE_BOT_CHUNK_LIST,
  LOADING_GENERATE_LLM_FALSE,
  LOADING_GENERATE_LLM_TRUE,
} from "../../context/types/types";
import { EventSourcePolyfill } from "event-source-polyfill";
import { ContextChat } from "../../context/ChatContext";
// import { useKeycloak } from "@react-keycloak/web";

interface interactProps {
  query: string;
  chat_id: string;
  onMessage: (message: string) => void;
  onStart: () => void;
  onEnd: () => void;
}
const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/chat_router";

const useInteractWithSmooth = () => {
  const { dispatchChat } = useContext(ContextChat) || {};
  // const { keycloak } = useKeycloak();
  const interactChat = async ({
    query,
    chat_id,
    onMessage,
    onStart,
    onEnd,
  }: interactProps) => {
    if (!dispatchChat) {
      return null;
    }

    const url = `${URL}${PATH_DEFAULT}/stream?query=${encodeURIComponent(
      query
    )}&chat_id=${encodeURIComponent(chat_id)}`;

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        // Authorization: `Bearer ${keycloak.token}`,
      },
    });

    let data = "";

    eventSource.onopen = function () {
      console.log("Stream iniciado.");
      onStart?.(); // Chama o callback onStart, se definido
      // dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });
    };

    eventSource.onmessage = function (event) {
      const newMessage = event.data;
      if (newMessage !== ":\n\n") data += newMessage;
      onMessage(newMessage);
      dispatchChat({ type: ADD_MESSAGE_BOT, payload: data });
    };

    eventSource.onerror = function () {
      eventSource.close();
      onEnd?.(); // Chama o callback onEnd, se definido
      dispatchChat({ type: LOADING_GENERATE_LLM_FALSE });
    };
  };
  return { interactChat };
};
export default useInteractWithSmooth;
