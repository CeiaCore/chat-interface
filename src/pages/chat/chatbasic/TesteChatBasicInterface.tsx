import styles from "./ChatBasicInterface.module.css";

import ReactMarkdown from "react-markdown";
import Feedback from "../../../components/chat/Feedback";
import Input from "../../../components/chat/Input";
import FormDialog from "../../../components/chat/Dislike";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextChat } from "../../../context/ChatContext";
import useGetById from "../../../hooks/chat/useGetById";
import { ACTIVE_SCROLL, DEACTIVE_SCROLL } from "../../../context/types/types";
import InputAdvanced from "../../../components/chat/InputAdvanced";
import useInteract from "../../../hooks/chat/useInteractionWithoutSmooth";
import remarkGfm from "remark-gfm";
import { GooSpinner } from "react-spinners-kit";

export interface ChatBasicInterfaceProps {
  chat_id: string | undefined;
  LOGO_CHAT: string;
  setOpenReference: (isOpen: boolean) => void;
  openReference: boolean | undefined;
}

const TesteChatBasicInterface = ({
  props: { chat_id, LOGO_CHAT, openReference, setOpenReference },
}: {
  props: ChatBasicInterfaceProps;
}) => {
  const { stateChat, dispatchChat } = useContext(ContextChat) || {};
  const [open, setOpen] = React.useState(false);
  const [indexFeedback, setIndexFeedback]: any = React.useState("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { interactChat } = useInteract();
  const [renderedChunks, setRenderedChunks] = useState([]);

  useEffect(() => {
    if (stateChat && stateChat.is_active_scroll && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    stateChat?.message_test,
    stateChat?.messages,
    stateChat?.is_active_scroll,
  ]);
  const previousScrollY = useRef(window.scrollY); //

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY < previousScrollY.current &&
        stateChat &&
        stateChat.message_test
      ) {
        dispatchChat({ type: DEACTIVE_SCROLL });
      } else if (currentScrollY === previousScrollY.current) {
        dispatchChat({ type: ACTIVE_SCROLL });
      }

      previousScrollY.current = currentScrollY; // Atualiza a posição anterior
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [stateChat?.message_test]);

  const handleClose = () => {
    setOpen(false);
  };
  const [feedback, setFeedback]: any = React.useState("");

  const user_id = 1;

  useGetById({ chat_id: String(chat_id) });

  // Estado para controlar mensagens já renderizadas
  const [renderedMessages, setRenderedMessages] = useState<number[]>([]);
  const [message_temp, setMessageTemp] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  useEffect(() => {
    if (stateChat?.messages) {
      // Adiciona os índices das mensagens ao estado quando renderizadas
      setRenderedMessages((prev) =>
        stateChat.messages.map((_, index) =>
          prev.includes(index) ? index : index
        )
      );
    }
  }, [stateChat?.messages]);

  const fullText = renderedChunks.map(({ text }) => text).join("");
  let var_chunk = "";
  const InteractionTest = () => {
    interactChat({
      chat_id: String(chat_id),
      onStart: () => {
        console.log("Transmissão começou.");
        setIsStreaming(true); // Marca o início do streaming
      },

      query: `Explique o que é enap e use tabelas para os conceitos`,
      onMessage: (chunk) => {
        console.log("Nova chunk recebida:", chunk);
        var_chunk += chunk;
        setMessageTemp(var_chunk);
        processStream(chunk);

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

        setTimeout(() => {
          setRenderedChunks((prev) =>
            prev.map((item) => ({
              ...item,
              opacity: 1, // Garante que todos tenham opacidade 1
            }))
          );
        }, 200);
        // Atualize o estado ou a interface do usuário com a nova mensagem
      },
      onEnd: () => {
        console.log("Transmissão terminou.");
        setIsStreaming(false); // Marca o fim do streaming
      },
    });
  };

  // const InteractionTest = () => {
  //   interactChat({
  //     chat_id: String(chat_id),
  //     query: "Explique detalhadamente sobre a ENAP",
  //     onMessage: (newMessage) => {
  //       console.log("Nova mensagem recebida:", newMessage);

  //       setRenderedChunks((prevChunks) => {
  //         // Cria um novo chunk com efeito de opacidade inicial
  //         const newChunk = {
  //           text: newMessage,
  //           opacity: 0,
  //           id: prevChunks.length,
  //         };

  //         // Atualiza o texto completo concatenando os novos chunks
  //         const updatedChunks = [...prevChunks, newChunk];

  //         // Renderiza os chunks de forma suave com um efeito em span
  //         setTimeout(() => {
  //           setRenderedChunks((finalChunks) =>
  //             finalChunks.map((chunk, index) => ({
  //               ...chunk,
  //               opacity: index === updatedChunks.length - 1 ? 1 : chunk.opacity,
  //             }))
  //           );
  //         }, 50);

  //         return updatedChunks;
  //       });

  //       // Atualiza o texto principal
  //       setTimeout(() => {
  //         setRenderedChunks((finalChunks) => {
  //           // Remove todos os chunks anteriores e substitui pelo texto completo
  //           const fullText = finalChunks.map((chunk) => chunk.text).join("");
  //           return [
  //             {
  //               text: fullText,
  //               opacity: 1,
  //               id: 0,
  //             },
  //           ];
  //         });
  //       }, 200);
  //     },
  //   });
  // };

  const [renderedChunks2, setRenderedChunks2] = useState([]);
  const chatBoxRef = useRef(null);
  const [response, setResponse] = useState(null);

  const processAssistantResponse = async (response) => {
    // const reader = response.body.getReader();
    // const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    // while (!done) {
    // const { value, done: readerDone } = await reader.read();
    // done = readerDone;

    // if (value) {

    const chunk = response;
    buffer += chunk;
    const lines = buffer.replace(/\n\s+/g, " ").trim();
    // const lines = buffer.split("\n");
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();

      if (line) {
        addChunk(line);
      }
    }
    buffer = lines[lines.length - 1];
  };
  // };
  // };

  const bufferRef = useRef(""); // Buffer para acumular chunks incompletos
  const processStream = (incomingChunk) => {
    bufferRef.current += incomingChunk; // Acumula o chunk no buffer
    const lines = bufferRef.current.split("\n"); // Divide o buffer em linhas

    // Processa todas as linhas completas, exceto a última
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        addChunk(line);
      }
    }

    // Atualiza o buffer com a última linha (incompleta)
    bufferRef.current = lines[lines.length - 1];
  };

  const addChunk = (text) => {
    const id = `${Date.now()}-${Math.random()}`;
    setRenderedChunks2((prevChunks) => [
      ...prevChunks,
      { text: formatMessage(text), opacity: 0, id },
    ]);

    // Atualizar a opacidade após uma pequena espera
    setTimeout(() => {
      setRenderedChunks2((prevChunks) =>
        prevChunks.map((chunk) =>
          chunk.id === id ? { ...chunk, opacity: 1 } : chunk
        )
      );
    }, 200);

    scrollToBottom();
  };

  const formatMessage = (message) => {
    // const sanitizedMessage = message.replace(/\n/g, "<br>");
    // const rawHTML = marked.parse(message);
    // return DOMPurify.sanitize(rawHTML);
    return message;
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
          if (currentChunk < renderedChunks.length) {
            controller.enqueue(
              encoder.encode(renderedChunks[currentChunk].text)
            );
            currentChunk++;
            console.log(renderedChunks[currentChunk].text);

            setTimeout(pushChunk, 1); // Simula streaming com 1 segundo de intervalo
          } else {
            controller.close();
          }
        };
        pushChunk();
      },
    });
  };

  // const handleMockResponse = () => {
  //   const mockResponse = {
  //     body: mockStreamedResponse(),
  //   };
  //   setResponse(mockResponse);
  // };

  const qwer = `| **Serviço**                  | **Descrição**                                                                                                                                                       |

|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|

| Cursos e Programas          | Cursos de curta e longa duração, especializações e mestrados para servidores públicos, oferecidos nas modalidades presencial e a distância.                                                                |

| Pesquisas e Estudos         | Desenvolvimento de pesquisas na área de gestão pública para a produção de conhecimento e inovação das práticas administrativas.                                                                           |

| Publicações e Materiais     | Disponibilização de livros, artigos, cartilhas e outros materiais para o aprimoramento dos servidores e da gestão pública.                                                                                     |

| Eventos e Seminários        | Promoção de eventos para o debate de temas relevantes e troca de experiências em gestão pública.                                                                                                      |

| Plataformas e Ambientes Virtuais| Disponibilização de plataformas online para cursos, eventos, materiais e conteúdos sobre gestão pública. |



Aqui está a tabela renderizada com os dados fornecidos:

| **Serviço**                  | **Descrição**                                                                                                                                                       |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Cursos e Programas**       | Cursos de curta e longa duração, especializações e mestrados para servidores públicos, oferecidos nas modalidades presencial e a distância.                        |
| **Pesquisas e Estudos**      | Desenvolvimento de pesquisas na área de gestão pública para a produção de conhecimento e inovação das práticas administrativas.                                    |
| **Publicações e Materiais**  | Disponibilização de livros, artigos, cartilhas e outros materiais para o aprimoramento dos servidores e da gestão pública.                                         |
| **Eventos e Seminários**     | Promoção de eventos para o debate de temas relevantes e troca de experiências em gestão pública.                                                                  |
| **Plataformas e Ambientes Virtuais** | Disponibilização de plataformas online para cursos, eventos, materiais e conteúdos sobre gestão pública.                                                        |



`;

  return (
    <>
      <FormDialog
        handleClose={handleClose}
        open={open}
        // metadata={metadata}
        user_id={user_id}
        chat_id={chat_id}
        setFeedback={setFeedback}
        indexFeedback={indexFeedback}
      />

      <div className={styles.container}>
        {stateChat?.messages?.map((element: any, index: any) => (
          <>
            {element.rule === "user" ? (
              <div className={`${styles.message_user} ${styles.user}`}>
                {element.message}
              </div>
            ) : (
              <div className={`${styles.message} ${styles.bot}`}>
                <img
                  onClick={() => {
                    InteractionTest();
                  }}
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "-45px",
                    width: "32px",
                  }}
                  src={LOGO_CHAT}
                  alt="Logo"
                />

                {/* {element.message && element.message.length > 0 ?  ( */}
                {true ? (
                  <>
                    {/* <ReactMarkdown>
                      {renderedChunks.map(({ text }) => text).join("")}
                    </ReactMarkdown> */}
                    {/* 
                    {renderedChunks.map(({ text, opacity, id }) => (
                      <span
                        key={id}
                        style={{
                          opacity: opacity,
                          transition: "opacity 0.5s ease-in-out", // Transição suave de opacidade
                        }}
                      >
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </span>
                    ))} */}
                    {/* {renderedChunks
                      .filter(({ text }) => text && text.trim().length > 0) // Filtra spans vazios
                      .map(({ text, opacity, id }) => (
                        <span
                          key={id}
                          style={{
                            opacity,
                            transition: "opacity 0.5s ease-in-out",
                            display: "inline", // Garante que os chunks sejam contínuos
                          }}
                        >
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </span>
                      ))} */}
                    <div>
                      {/* <ReactMarkdown
                        components={{
                          a: ({ node, href, ...props }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            >
                              {props.children}
                            </a>
                          ),
                        }}
                        className={styles.markdown}
                        remarkPlugins={[remarkGfm]}
                      >
                        {qwer}
                      </ReactMarkdown> */}
                      <div
                        style={{ transition: "1s" }}
                        id="chat-box"
                        ref={chatBoxRef}
                      >
                        {isStreaming ? (
                          <>
                            {renderedChunks2.map(({ text, opacity, id }) => (
                              <span
                                key={id}
                                style={{
                                  display: "block",
                                  opacity: opacity,
                                  transition: "opacity 2s ease",
                                }}
                                // dangerouslySetInnerHTML={{ __html: text }}
                              >
                                <ReactMarkdown
                                  components={{
                                    a: ({ node, href, ...props }) => (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                      >
                                        {props.children}
                                      </a>
                                    ),
                                  }}
                                  className={styles.markdown}
                                  remarkPlugins={[remarkGfm]}
                                >
                                  {text}
                                </ReactMarkdown>
                              </span>
                            ))}
                          </>
                        ) : (
                          <ReactMarkdown
                            components={{
                              a: ({ node, href, ...props }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                >
                                  {props.children}
                                </a>
                              ),
                            }}
                            className={styles.markdown}
                            remarkPlugins={[remarkGfm]}
                          >
                            {message_temp}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <GooSpinner size={27} color="#333" />
                  </div>
                )}

                {/* {stateChat && !stateChat?.loading_generate_llm && ( */}
                {false && (
                  <div
                    className={styles.source}
                    onClick={() => {
                      setOpenReference(!openReference);
                    }}
                  >
                    Ver fontes
                  </div>
                )}
                {false && (
                  <Feedback
                    handleClickOpen={handleClickOpen}
                    setIndexFeedback={setIndexFeedback}
                    indexFeedback={indexFeedback}
                    index={index}
                  />
                )}
              </div>
            )}
          </>
        ))}
        <div ref={messageEndRef} />
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            {/* <Input chat_id={chat_id} /> */}
            <InputAdvanced chat_id={chat_id} />
          </div>
          {/* <div onClick={() => teste()}>AQUII</div> */}
        </div>
      </div>
    </>
  );
};

export default TesteChatBasicInterface;
