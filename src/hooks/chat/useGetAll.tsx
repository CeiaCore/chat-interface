import { useContext, useEffect } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import {
  LOAD_CHATS,
  LOADING_DRAWER_FALSE,
  LOADING_DRAWER_TRUE,
} from "../../context/types/types";
import { ConfigHeader } from "../config/ConfigHeader";

const URL = window._env_.URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

interface UseGetAllProps {
  user_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}

const useGetAll = ({ user_id }: UseGetAllProps) => {
  const { dispatchChat } = useContext(ContextChat) || {};
  const { config } = ConfigHeader();

  const getData = async () => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }

    dispatchChat({ type: LOADING_DRAWER_TRUE });

    try {
      const response = await axios.get(
        URL + PATH_DEFAULT + `/get_all_chat/${user_id}`,
        config
      );

      dispatchChat({ type: LOAD_CHATS, payload: response.data.chats });
      dispatchChat({ type: LOADING_DRAWER_FALSE });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      dispatchChat({ type: LOADING_DRAWER_FALSE });
    }
  };

  useEffect(() => {
    if (user_id) {
      getData();
    }
  }, [user_id]);

  return { getData };
};

export default useGetAll;
