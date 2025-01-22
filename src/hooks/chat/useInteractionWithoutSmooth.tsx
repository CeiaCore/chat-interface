import { useContext } from "react";
import {
  ADD_MESSAGE_BOT,
  ADD_MESSAGE_BOT_CHUNK_LIST,
  ADD_METADATA_MESSAGE_BOT,
  LOADING_GENERATE_LLM_FALSE,
  LOADING_GENERATE_LLM_TRUE,
} from "../../context/types/types";
import { EventSourcePolyfill } from "event-source-polyfill";
import { ContextChat } from "../../context/ChatContext";
// import { useKeycloak } from "@react-keycloak/web";

interface interactProps {
  query: string;
  chat_id: string;
}
const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/chat_router";

const useInteractionWithoutSmooth = () => {
  const { dispatchChat } = useContext(ContextChat) || {};
  // const { keycloak } = useKeycloak();
  const interactChat = async ({ query, chat_id }: interactProps) => {
    if (!dispatchChat) {
      return null;
    }
    dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });

    const url = `${URL}${PATH_DEFAULT}/stream?query=${encodeURIComponent(
      query
    )}&chat_id=${encodeURIComponent(chat_id)}`;

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        // Authorization: `Bearer ${keycloak.token}`,
      },
    });

    let dataChunks: string[] = [];

    eventSource.onmessage = function (event) {
      const newMessage = event.data;

      if (newMessage.includes("references: ")) {
        const jsonData = newMessage.replace("references: ", "").trim();
        try {
          const parsedData = JSON.parse(jsonData);

          dispatchChat({
            type: ADD_METADATA_MESSAGE_BOT,
            payload: parsedData,
          });
        } catch (e) {
          console.error("Erro ao parsear JSON:", e);
        }
      } else {
        if (newMessage !== ":\n\n") dataChunks.push(newMessage);
        const data = dataChunks.join("");
        dispatchChat({ type: ADD_MESSAGE_BOT, payload: data });
      }
    };

    eventSource.onerror = function () {
      eventSource.close();
      dispatchChat({ type: LOADING_GENERATE_LLM_FALSE });
    };
  };
  return { interactChat };
};
export default useInteractionWithoutSmooth;
