import axios from "axios";
import { useEffect, useState } from "react";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router";

interface useGetKnowledgeByUserProps {
  user_id: string;
}
const useGetKnowledgeByUser = ({ user_id }: useGetKnowledgeByUserProps) => {
  // const { keycloak } = useKeycloak();
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [knowledges, setKnowledges] = useState([]);

  const getKnowledgeByUser = async () => {
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
        URL + PATH_DEFAULT + `/knowledge-get-by-user/?user_id=${user_id}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getKnowledgeByUser().then((result) => {
      setKnowledges(result);
    });
  }, [user_id]);

  return { getKnowledgeByUser, knowledges };
};

export default useGetKnowledgeByUser;
