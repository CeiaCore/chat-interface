import { useContext } from "react";
import axios from "axios";
import { ContextChat } from "../../context/ChatContext";
import {
  LOAD_CHATS,
  LOADING_FALSE,
  LOADING_TRUE,
} from "../../context/types/types";

const URL = import.meta.env.VITE_URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

interface UseCreateChatProps {
  user_id: string;
}

const useCreateChat = () => {
  const { dispatchChat } = useContext(ContextChat) || {};

  const createChat = async ({ user_id }: UseCreateChatProps) => {
    if (!dispatchChat) {
      console.error(
        "dispatchChat não está disponível. Certifique-se de que o contexto está configurado corretamente."
      );
      return null;
    }

    // Define estado de carregamento
    dispatchChat({ type: LOADING_TRUE });

    const body = {
      user_id,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      // Realiza a requisição POST
      const response = await axios.post(
        `${URL}${PATH_DEFAULT}/create_chat`,
        body,
        config
      );

      dispatchChat({ type: LOAD_CHATS, payload: response.data.chats });

      return response.data;
    } catch (error) {
      console.error("Erro ao criar chat:", error);

      dispatchChat({ type: LOADING_FALSE });

      throw error;
    } finally {
      dispatchChat({ type: LOADING_FALSE });
    }
  };

  return { createChat };
};

export default useCreateChat;
