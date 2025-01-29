import { useContext } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import {
  LOAD_CHATS,
  LOADING_DRAWER_FALSE,
  LOADING_DRAWER_TRUE,
} from "../../context/types/types";
import { ConfigHeader } from "../config/ConfigHeader";
// import { useKeycloak } from "@react-keycloak/web";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface useRemoveFile {
  chat_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
  document_id: string; // Change this type based on your use case (e.g.,
}

const useRemoveFile = () => {
  const { config } = ConfigHeader();

  // const { keycloak } = useKeycloak();
  const handleRemoveFile = async ({ chat_id, document_id }: useRemoveFile) => {
    try {
      const response = await axios.delete(
        URL + PATH_DEFAULT + `/remove-embeddings/${chat_id}/${document_id}`,
        config
      );
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return { handleRemoveFile };
};

export default useRemoveFile;
