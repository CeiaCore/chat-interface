import axios from "axios";
import { useState } from "react";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface UseGetByIdProps {
  chat_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}
const useGetPreChatById = () => {
  // const { keycloak } = useKeycloak();
  const [loadingFiles, setLoadingFiles] = useState(false);

  const getChatForms = async ({ chat_id }: UseGetByIdProps) => {
    setLoadingFiles(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${keycloak.token}`,
      },
    };
    try {
      const response = await axios.get(
        URL + PATH_DEFAULT + `/get-pre-chat-form-data?chat_id=${chat_id}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return { getChatForms, loadingFiles, setLoadingFiles };
};

export default useGetPreChatById;
