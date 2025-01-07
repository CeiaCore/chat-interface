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
import remarkGfm from "remark-gfm";
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
---

# 🌟 **Resumo: A Revolução Digital**  

A **Revolução Digital** é um marco histórico que transformou a maneira como vivemos, trabalhamos e nos conectamos. Este resumo apresenta os principais aspectos dessa transformação.

---

## 🚀 **O que é a Revolução Digital?**  
A Revolução Digital refere-se à transição de tecnologias analógicas para digitais, que começou no século XX e continua a moldar o mundo moderno.

**Principais características:**
- Automação de processos.
- Conectividade global através da internet.
- Produção e consumo de dados em larga escala.

---

## 🔑 **Principais Marcos**  

1. **Década de 1940: O Início**  
   - Criação dos primeiros computadores, como o ENIAC.

2. **Década de 1980: A Popularização do PC**  
   - Surgimento de empresas como a Microsoft e a Apple.  
   - Computadores pessoais tornam-se acessíveis.

3. **Década de 1990: A Era da Internet**  
   - Expansão da World Wide Web.  
   - Navegadores como o Netscape revolucionam a navegação.

4. **Século XXI: O Boom Tecnológico**  
   - Smartphones e redes sociais conectam bilhões de pessoas.  
   - Avanços em inteligência artificial (IA) e big data.

---

## 📊 **Impactos da Revolução Digital**  

### **🌐 Na Sociedade**  
- **Educação:** Aprendizado online e acesso global ao conhecimento.  
- **Comunicação:** Redes sociais e mensagens instantâneas.

### **🏢 Nos Negócios**  
- E-commerce cresce exponencialmente.  
- Modelos de negócios baseados em plataformas (Uber, Airbnb).  

### **🤖 Na Tecnologia**  
- Automação e inteligência artificial transformam indústrias.  
- Internet das Coisas (IoT) conecta dispositivos no dia a dia.  

---

## 💡 **Benefícios e Desafios**  

### **✅ Benefícios:**  
- Acesso à informação em tempo real.  
- Aumento da produtividade e eficiência.

### **⚠️ Desafios:**  
- Privacidade e segurança de dados.  
- Exclusão digital em regiões menos desenvolvidas.

---

## 📘 **Curiosidades**  

| Data Importante    | Evento                                  | Impacto                                  |
|--------------------|-----------------------------------------|------------------------------------------|
| **1989**           | Criação da World Wide Web              | Facilitou o acesso à internet.          |
| **2007**           | Lançamento do iPhone                   | Popularizou os smartphones.             |
| **2023**           | Expansão de IA generativa (ex: ChatGPT)| Transformou a interação com a tecnologia.|

---

## ✨ **Conclusão**  
A **Revolução Digital** transformou o mundo como o conhecemos, trazendo avanços inimagináveis e desafios que ainda enfrentamos. Continuar adaptando-se a essas mudanças é essencial para um futuro sustentável e inovador.

---

> "A tecnologia deve ser uma ferramenta para unir as pessoas, não para dividi-las." – Anônimo  

---

### **Quer saber mais?**  
- [História da Internet](https://www.historyofinternet.com)  
- [Como a IA está mudando o mundo](https://www.aiexamples.com)

--- 

Espero que tenha gostado deste resumo! Se precisar de ajustes ou de outro tema, é só pedir. 😊
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
                    Ver fontes
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
