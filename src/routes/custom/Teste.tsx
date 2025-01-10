import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const ChatBoxWithSmoothChunks = () => {
  const [renderedChunks, setRenderedChunks] = useState([]);
  const chatBoxRef = useRef(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (response) {
      processAssistantResponse(response);
    }
  }, [response]);

  const processAssistantResponse = async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value);
        buffer += chunk;

        const lines = buffer.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          if (line) {
            addChunk(line);
          }
        }
        buffer = lines[lines.length - 1];
      }
    }
  };

  const addChunk = (text) => {
    const id = `${Date.now()}-${Math.random()}`;
    setRenderedChunks((prevChunks) => [
      ...prevChunks,
      { text: formatMessage(text), opacity: 0, id },
    ]);

    // Atualizar a opacidade após uma pequena espera
    setTimeout(() => {
      setRenderedChunks((prevChunks) =>
        prevChunks.map((chunk) =>
          chunk.id === id ? { ...chunk, opacity: 1 } : chunk
        )
      );
    }, 10);

    scrollToBottom();
  };

  const formatMessage = (message) => {
    const rawHTML = marked.parse(message);
    return DOMPurify.sanitize(rawHTML);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const mockStreamedResponse = () => {
    const encoder = new TextEncoder();
    // const chunks = [
    //   "Hello, how can I help you?\n",
    //   "Let me think...\n",
    //   "Here's some information for you:\n",
    //   "- Item 1\n",
    //   "- Item 2\n",
    // ];

    const chunks = [
      "Com",
      "preendo. Para que eu possa te ajudar da melhor forma, por favor,",
      "especifique o que você gostaria que eu explicasse sobre a ENAP. \n",
      "Seja mais específico sobre qual assunto ou tópico você tem interesse, assim poderei fornecer informações relevantes e detalhadas.",
      "*   **Definição e funcionamento da ENAP**?",
      "*   **Cursos e serviços oferecidos pela ENAP**?",
      "*   **Gratuidade e custos dos serviços da ENAP**?",
      "*   **Informações gerais sobre a ENAP**?",
      "Com mais detalhes, poderei te dar uma resposta mais completa e útil.\n",
    ];

    let currentChunk = 0;

    return new ReadableStream({
      start(controller) {
        const pushChunk = () => {
          if (currentChunk < chunks.length) {
            controller.enqueue(encoder.encode(chunks[currentChunk]));
            currentChunk++;
            console.log(chunks[currentChunk]);

            setTimeout(pushChunk, 1); // Simula streaming com 1 segundo de intervalo
          } else {
            controller.close();
          }
        };
        pushChunk();
      },
    });
  };

  const handleMockResponse = () => {
    const mockResponse = {
      body: mockStreamedResponse(),
    };

    setResponse(mockResponse);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat Simulation</h1>
      <button onClick={handleMockResponse} style={{ marginBottom: "10px" }}>
        Start Mock Stream
      </button>
      <div
        id="chat-box"
        ref={chatBoxRef}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {renderedChunks.map(({ text, opacity, id }) => (
          <span
            key={id}
            style={{
              display: "block",
              opacity: opacity,
              transition: "opacity 0.5s ease-in-out", // Suavizar transição
              marginBottom: "5px",
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatBoxWithSmoothChunks;
