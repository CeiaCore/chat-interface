import React, { useState, useEffect } from "react";

const TypingEffect = ({ stream, fadeSpeed = 1000 }) => {
  const [renderedChunks, setRenderedChunks] = useState([]);

  useEffect(() => {
    const handleStream = async () => {
      for await (const chunk of stream) {
        // Adiciona o chunk com opacidade inicial 0
        setRenderedChunks((prev) => [
          ...prev,
          { text: chunk, opacity: 0, id: prev.length },
        ]);

        // Atualiza a opacidade do último chunk para 1 após renderizar
        setTimeout(() => {
          setRenderedChunks((prev) =>
            prev.map((item, index) =>
              index === prev.length - 1 ? { ...item, opacity: 1 } : item
            )
          );
        }, 50); // Pequeno delay para iniciar o fade-in
      }
    };

    handleStream();
  }, [stream]);

  return (
    <div style={{ display: "inline", whiteSpace: "pre-wrap" }}>
      {renderedChunks.map(({ text, opacity, id }) => (
        <span
          key={id}
          style={{
            display: "inline-block",
            opacity,
            transition: `opacity 0.4s ease-in-out`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

const simulateStream = async function* () {
  const chunks = [
    "Claro! ",
    "Você ",
    "uma ",
    "história ",
    "épica ",
    "para ",
    "você.",
  ];

  for (const chunk of chunks) {
    yield chunk;
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simula delay do backend
  }
};

const Teste = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
      }}
    >
      <h1>Chatbot</h1>
      <TypingEffect stream={simulateStream()} fadeSpeed={300} />
    </div>
  );
};

export default Teste;
