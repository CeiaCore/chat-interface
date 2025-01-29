import styles from "./PreChat.module.css";

import ReactMarkdown from "react-markdown";
import Feedback from "../../../components/chat/Feedback";
import Input from "../../../components/chat/Input";
import FormDialog from "../../../components/chat/Dislike";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextChat } from "../../../context/ChatContext";
import useGetById from "../../../hooks/chat/useGetById";
import {
  ACTIVE_SCROLL,
  ADD_REFERENCE,
  CLEAR_MESSAGES,
  DEACTIVE_SCROLL,
} from "../../../context/types/types";
import InputAdvanced from "../../../components/chat/InputAdvanced";
import remarkGfm from "remark-gfm";
import { PiChatTeardropText } from "react-icons/pi";
import InputAdvancedPreChat from "../components/InputAdvancedPreChat";
import { GooSpinner } from "react-spinners-kit";

export interface PreChatBasicInterfaceProps {
  chat_id: string | undefined;
  LOGO_CHAT: string;
  prompt: string;
  setOpenReference: (value: boolean) => void;
}

const PreChatInterface = ({
  props: { chat_id, LOGO_CHAT, prompt, setOpenReference, openReference },
}: {
  props: PreChatBasicInterfaceProps;
}) => {
  const { stateChat, dispatchChat } = useContext(ContextChat) || {};
  const [open, setOpen] = React.useState(false);
  const [indexFeedback, setIndexFeedback]: any = React.useState("");
  const [indexReference, setIndexReference] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Estado para controlar o hover

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  useEffect(() => {
    dispatchChat({ type: CLEAR_MESSAGES });
  }, []);

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
        <h5 className={styles.title}>Chat</h5>
        {stateChat?.messages.length <= 0 && (
          <div
            style={{
              display: "flex", // Define flexbox
              alignItems: "center", // Centraliza verticalmente
              justifyContent: "center", // Centraliza horizontalmente
              height: "calc(100vh - 300px)", // Certifique-se de que o container tenha altura suficiente
            }}
          >
            <PiChatTeardropText
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                height: "40px",
                width: "40px",
                color: "rgb(172, 172, 172)",
              }}
            />
          </div>
        )}
        {stateChat?.messages?.map((element: any, index: any) => (
          <>
            {element.rule === "user" ? (
              <div className={`${styles.message_user} ${styles.user}`}>
                {element.message}
              </div>
            ) : (
              <div className={`${styles.message} ${styles.bot}`}>
                {element.message && element.message.length > 0 ? (
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
                    {element.message}
                  </ReactMarkdown>
                ) : (
                  <div>
                    <GooSpinner size={27} color="#333" />
                  </div>
                )}

                {!stateChat?.loading_generate_llm &&
                  element?.metadata.length > 0 && (
                    <div
                      className={styles.source}
                      onClick={() => {
                        setIndexReference(index);

                        if (indexReference === null) {
                          setOpenReference(true);
                        } else {
                          if (index === indexReference) {
                            setOpenReference(!openReference);
                            setIndexReference(null);
                          }
                        }
                        dispatchChat({
                          type: ADD_REFERENCE,
                          payload: element?.metadata,
                        });
                      }}
                    >
                      Ver fontes
                    </div>
                  )}
                <div
                  style={{
                    height: "20px",
                  }}
                >
                  <Feedback
                    handleClickOpen={handleClickOpen}
                    message={element?.message}
                    setIndexFeedback={setIndexFeedback}
                    indexFeedback={indexFeedback}
                    index={index}
                    hoveredIndex={hoveredIndex}
                  />
                </div>
              </div>
            )}
          </>
        ))}
        <div ref={messageEndRef} />
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            {/* <Input chat_id={chat_id} /> */}
            <InputAdvancedPreChat prompt={prompt} chat_id={chat_id} />
          </div>
          {/* <div onClick={() => teste()}>AQUII</div> */}
        </div>
      </div>
    </>
  );
};

export default PreChatInterface;
