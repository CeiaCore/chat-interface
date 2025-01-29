import axios from "axios";
import { useEffect, useState } from "react";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface useGetKnowledgeByIdProps {
  knowledge_id: string;
}
const useGetKnowledgeById = ({ knowledge_id }: useGetKnowledgeByIdProps) => {
  // const { keycloak } = useKeycloak();
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [knowledges, setKnowledges] = useState([]);

  const getKnowledgeById = async () => {
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
        URL + PATH_DEFAULT + `/knowledge-get-by-id/?id=${knowledge_id}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getKnowledgeById().then((result) => {
      setKnowledges(result);
    });
  }, [knowledge_id]);

  return { knowledges };
};

export default useGetKnowledgeById;
