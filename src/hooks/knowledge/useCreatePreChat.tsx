import { useContext } from "react";
import axios from "axios";
import { ContextChat } from "../../context/ChatContext";
import {
  LOAD_CHATS,
  LOADING_FALSE,
  LOADING_TRUE,
} from "../../context/types/types";
import { ConfigHeader } from "../config/ConfigHeader";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface UseCreateChatProps {
  user_id: string;
}

const useCreatePreChat = () => {
  const { dispatchChat } = useContext(ContextChat) || {};
  const { config } = ConfigHeader();
  const createPreChat = async ({ user_id }: UseCreateChatProps) => {
    if (!dispatchChat) {
      console.error(
        "dispatchChat não está disponível. Certifique-se de que o contexto está configurado corretamente."
      );
      return null;
    }

    dispatchChat({ type: LOADING_TRUE });

    const body = {
      user_id,
    };

    try {
      // Realiza a requisição POST
      const response = await axios.post(
        `${URL}${PATH_DEFAULT}/pre-chat-create`,
        body,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao criar chat:", error);

      dispatchChat({ type: LOADING_FALSE });

      throw error;
    } finally {
      dispatchChat({ type: LOADING_FALSE });
    }
  };

  return { createPreChat };
};

export default useCreatePreChat;
