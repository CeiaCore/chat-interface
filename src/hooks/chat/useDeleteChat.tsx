import { useContext } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import {
  LOAD_CHATS,
  LOADING_DRAWER_FALSE,
  LOADING_DRAWER_TRUE,
} from "../../context/types/types";
import { useKeycloak } from "@react-keycloak/web";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/chat_router";

interface UseDeleteChatProps {
  chat_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}

const useDeleteChat = () => {
  const { dispatchChat } = useContext(ContextChat) || {};
  const { keycloak } = useKeycloak();
  const deleteChat = async ({ chat_id }: UseDeleteChatProps) => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }

    dispatchChat({ type: LOADING_DRAWER_TRUE });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.delete(
        URL + PATH_DEFAULT + `/delete_chat/${chat_id}`,
        config
      );
      dispatchChat({ type: LOAD_CHATS, payload: response.data.chats });
      dispatchChat({ type: LOADING_DRAWER_FALSE });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      dispatchChat({ type: LOADING_DRAWER_FALSE });
    }
  };

  return { deleteChat };
};

export default useDeleteChat;
