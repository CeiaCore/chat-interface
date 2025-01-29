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

interface useCreateKnowldegeProps {
  id: string;
  name: string;
  description: string;
  prompt: string;
  user_id: string;
  private_agent: boolean;
}

const useCreateKnowledge = () => {
  const { dispatchChat } = useContext(ContextChat) || {};

  const { config } = ConfigHeader();

  const createKnowledge = async ({
    user_id,
    description,
    id,
    name,
    private_agent,
    prompt,
  }: useCreateKnowldegeProps) => {
    if (!dispatchChat) {
      console.error(
        "dispatchChat não está disponível. Certifique-se de que o contexto está configurado corretamente."
      );
      return null;
    }

    const body = {
      user_id,
      description,
      id,
      name,
      private: private_agent,
      prompt,
    };

    try {
      // Realiza a requisição POST
      const response = await axios.post(
        `${URL}${PATH_DEFAULT}/knowledge-create/`,
        body,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao criar chat:", error);

      throw error;
    }
  };

  return { createKnowledge };
};

export default useCreateKnowledge;
