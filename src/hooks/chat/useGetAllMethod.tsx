import { useContext } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import { LOAD_CHATS } from "../../context/types/types";
import { ConfigHeader } from "../config/ConfigHeader";

const URL = window._env_.URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

interface useGetAllMethodProps {
  user_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}
const useGetAllMethod = () => {
  const { dispatchChat } = useContext(ContextChat) || {};
  const { config } = ConfigHeader();
  const getData = async ({ user_id }: useGetAllMethodProps) => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }

    try {
      const response = await axios.get(
        URL + PATH_DEFAULT + `/get_all_chat/${user_id}`,
        config
      );
      dispatchChat({ type: LOAD_CHATS, payload: response.data.chats });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return { getData };
};

export default useGetAllMethod;
