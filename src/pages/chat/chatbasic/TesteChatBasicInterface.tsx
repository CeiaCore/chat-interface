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
import useInteract from "../../../hooks/chat/useInteraction";
import DotLoader from "react-spinners/DotLoader";
import SyncLoader from "react-spinners/SyncLoader";
import Markdown from "react-markdown";
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

  const InteractionTest = () => {
    interactChat({
      chat_id: String(chat_id),
      query: "Explique detalhadamente o que é Enap",
      onMessage: (chunk) => {
        console.log("Nova chunk recebida:", chunk);

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

  const qwer = `

Claro! Aqui está um exemplo de um texto com diversos recursos de **Markdown** para mostrar como posso organizar a informação de maneira visualmente interessante:

---

# Guia Completo de Markdown

Markdown é uma linguagem de marcação simples, mas poderosa, que permite formatar texto de maneira fácil e legível. Aqui estão alguns dos principais recursos que você pode usar para organizar seus textos.

## 1. **Cabeçalhos**

Os cabeçalhos são usados para estruturar o conteúdo de maneira hierárquica. O número de # define o nível do cabeçalho:

### Nível 1 (Título principal)
#### Nível 2 (Subtítulo)
##### Nível 3 (Sub-subtítulo)

## 2. **Negrito e Itálico**

Você pode destacar palavras ou frases com **negrito** e *itálico*:

- **Negrito**: **texto em negrito**
- *Itálico*: *texto em itálico*
- **Negrito e *Itálico* juntos**: **texto em negrito e *itálico* juntos**

## 3. **Listas**

### Listas não ordenadas
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

### Listas ordenadas
1. Primeiro item
2. Segundo item
   1. Subitem A
   2. Subitem B

## 4. **Links e Imagens**

Você pode incluir links e imagens facilmente:

- [Google](https://www.google.com)
- ![Imagem exemplo](https://via.placeholder.com/150)

## 5. **Citações**

As citações são usadas para destacar citações ou referências:

> "O Markdown é uma linguagem de marcação leve."

## 6. **Código**

Você pode formatar trechos de código em uma linha ou em blocos:

- **Código em uma linha**: print("Hello, World!")
  
- **Bloco de código**:
  python
  def saudacao():
      print("Olá, mundo!")
  

## 7. **Tabelas**

Você pode criar tabelas de forma simples:

| Nome     | Idade | Profissão     |
|----------|-------|---------------|
| João     | 30    | Desenvolvedor |
| Maria    | 25    | Designer      |

## 8. **Separadores**

Você pode usar separadores horizontais para dividir seções:

---

## 9. **Emoji**

Markdown também suporta emojis! 🎉🚀

## 10. **Concluindo**

O Markdown é uma excelente maneira de organizar seu conteúdo com simplicidade e eficiência. Experimente os recursos acima para ver como eles podem melhorar sua escrita!

---

Espero que esse exemplo tenha ajudado a mostrar algumas das possibilidades! Se quiser algo mais específico, posso adaptar o conteúdo para suas necessidades.`;

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
                      <ReactMarkdown className={styles.markdown}>
                        {qwer}
                      </ReactMarkdown>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      transform: "scale(1.5)",
                      marginLeft: "15px",
                    }}
                  >
                    <DotLoader size={20} color="#6e6d6d" />
                  </div>
                )}
                {stateChat && !stateChat?.loading_generate_llm && (
                  <div
                    className={styles.source}
                    onClick={() => {
                      setOpenReference(!openReference);
                    }}
                  >
                    Fontes
                  </div>
                )}
                <Feedback
                  handleClickOpen={handleClickOpen}
                  setIndexFeedback={setIndexFeedback}
                  indexFeedback={indexFeedback}
                  index={index}
                />
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
