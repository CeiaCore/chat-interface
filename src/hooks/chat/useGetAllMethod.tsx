import { useContext } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";
import {
  LOAD_CHATS,
  LOADING_DRAWER_FALSE,
  LOADING_DRAWER_TRUE,
} from "../../context/types/types";

const URL = import.meta.env.VITE_URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

interface useGetAllMethodProps {
  user_id: string; // Change this type based on your use case (e.g., `number` or `string | number` if flexible)
}
const useGetAllMethod = () => {
  const { dispatchChat } = useContext(ContextChat) || {};

  const getData = async ({ user_id }: useGetAllMethodProps) => {
    if (!dispatchChat) {
      console.error("dispatchChat não está disponível.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
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
