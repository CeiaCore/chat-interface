import axios from "axios";
import { useEffect, useState } from "react";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

const useGetAllKnowledge = () => {
  // const { keycloak } = useKeycloak();
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [public_knowledges, public_setKnowledges] = useState([]);

  const getAllKnowledgePublic = async () => {
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
        URL + PATH_DEFAULT + `/knowledge-get-all-public/`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getAllKnowledgePublic().then((result) => {
      public_setKnowledges(result);
    });
  }, []);

  return { getAllKnowledgePublic, public_knowledges };
};

export default useGetAllKnowledge;
