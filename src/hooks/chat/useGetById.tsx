import { useContext, useEffect } from "react";
import { ContextChat } from "../../context/ChatContext";
import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

const useGetById = () => {
  const { dispatchChat } = useContext(ContextChat) || {};

  const getData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await axios.get(
        URL + PATH_DEFAULT + `?endpoint=get_all_chat_user_id`,
        config
      );
      const data = await response.json();
      dispatchChat({ type: "SET_DATA", payload: data });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return { getData };
};

export default useGetById;
