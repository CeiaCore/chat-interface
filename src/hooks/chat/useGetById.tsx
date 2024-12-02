import { useContext, useEffect } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import {
  LOAD_CHAT,
  LOADING_FALSE,
  LOADING_TRUE,
  SET_NEW_CHAT_FALSE,
} from "../../context/types/types";
import { useKeycloak } from "@react-keycloak/web";

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/chat_router";

interface UseGetByIdProps {
  chat_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}
const useGetById = ({ chat_id }: UseGetByIdProps) => {
  const { stateChat, dispatchChat } = useContext(ContextChat) || {};
  const { keycloak } = useKeycloak();

  const getData = async () => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }

    dispatchChat({ type: LOADING_TRUE });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
    };
    try {
      const response = await axios.get(
        URL + PATH_DEFAULT + `/get_chat_by_id/${chat_id}`,
        config
      );
      dispatchChat({ type: LOAD_CHAT, payload: response.data.chat });
      dispatchChat({ type: LOADING_FALSE });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      dispatchChat({ type: LOADING_FALSE });
    }
  };

  useEffect(() => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }
    if (chat_id && !stateChat?.new_chat) {
      getData();
    }
    if (stateChat?.new_chat) {
      dispatchChat({ type: SET_NEW_CHAT_FALSE });
    }
  }, [chat_id]);

  return { getData };
};

export default useGetById;
