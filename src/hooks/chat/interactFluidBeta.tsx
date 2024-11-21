import { useEffect, useState } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";

interface interactProps {
  query: string;
  chat_id: string;
}
const URL = window._env_.URL_API;
const PATH_DEFAULT = "/api/v1/chat_router";

const useHookTest = () => {
  const [message, setMessage] = useState("");
  const [currentChunk, setCurrentChunk] = useState("");

  const interactChat = async ({ query, chat_id }: interactProps) => {
    const url = `${URL}${PATH_DEFAULT}/stream?query=${encodeURIComponent(
      query
    )}&chat_id=${encodeURIComponent(chat_id)}`;

    const eventSource = new EventSourcePolyfill(url);

    eventSource.onmessage = function (event) {
      const data = event.data; // Novo chunk recebido
      setMessage((prevMessage) => prevMessage + data);
    };

    eventSource.onerror = () => {
      console.error("Erro ao conectar ao SSE.");
      eventSource.close();
    };
  };

  useEffect(() => {
    if (!currentChunk) return;

    // Processa todo o chunk em um loop síncrono
    const processChunk = () => {
      setMessage((prevMessage) => prevMessage + currentChunk);
      setCurrentChunk(""); // Limpa o chunk após processá-lo
    };

    processChunk();
  }, [currentChunk]);

  return { interactChat, message };
};
export default useHookTest;
