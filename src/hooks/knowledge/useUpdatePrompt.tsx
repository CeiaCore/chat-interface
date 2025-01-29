import axios from "axios";

import { ConfigHeader } from "../config/ConfigHeader";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface useUpdatePromptProps {
  chat_id: string;
  prompt: string;
}

const useUpdatePrompt = () => {
  const { config } = ConfigHeader();

  const updatePrompt = async ({ chat_id, prompt }: useUpdatePromptProps) => {
    const body = {
      chat_id,
      prompt,
    };

    try {
      // Realiza a requisição POST
      const response = await axios.post(
        `${URL}${PATH_DEFAULT}/save-prompt/`,
        body,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao criar chat:", error);

      throw error;
    }
  };

  return { updatePrompt };
};

export default useUpdatePrompt;
