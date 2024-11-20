import styles from "./ChatBasicInterface.module.css";

import Logo from "../../../assets/logos/chat_logo.png";
import ReactMarkdown from "react-markdown";
import Feedback from "../../../components/chat/Feedback";
import Input from "../../../components/chat/Input";
import FormDialog from "../../../components/chat/Dislike";
import React, { useContext, useEffect, useRef } from "react";
import { ContextChat } from "../../../context/ChatContext";
import useGetById from "../../../hooks/chat/useGetById";
import { ACTIVE_SCROLL, DEACTIVE_SCROLL } from "../../../context/types/types";
import { ContextAuth } from "../../../context/AuthContext";

const ChatBasicInterface = ({ chat_id }) => {
  const { stateChat, dispatchChat } = useContext(ContextChat) || {};
  const [open, setOpen] = React.useState(false);
  const [indexFeedback, setIndexFeedback]: any = React.useState("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { stateAuth } = useContext(ContextAuth) || undefined;

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
                  src={Logo}
                  alt="Logo"
                />
                {element.message && element.message.length > 0 ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          style={{
                            fontSize: "2em",
                            fontWeight: "bold",
                            marginBottom: "0.5em",
                          }}
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          style={{
                            fontSize: "1.75em",
                            fontWeight: "bold",
                            marginBottom: "0.5em",
                          }}
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          style={{
                            fontSize: "1.5em",
                            fontWeight: "bold",
                            marginBottom: "0.5em",
                          }}
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          style={{ lineHeight: "1.6", marginBottom: "1em" }}
                          {...props}
                        />
                      ),
                      a: ({ node, href, ...props }) => (
                        <a
                          href={href}
                          style={{
                            color: "#007bff",
                            textDecoration: "underline",
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {props.children}
                        </a>
                      ),
                      img: ({ node, src, alt, ...props }) => (
                        <img
                          src={src}
                          alt={alt}
                          style={{
                            maxWidth: "100%",
                            borderRadius: "8px",
                            margin: "1em 0",
                          }}
                          {...props}
                        />
                      ),
                      code: ({ inline, className, children, ...props }) => (
                        <code
                          style={{
                            backgroundColor: "#f5f5f5",
                            padding: inline ? "0.2em 0.4em" : "1em",
                            borderRadius: "4px",
                            fontFamily: "monospace",
                            display: inline ? "inline" : "block",
                            whiteSpace: "pre-wrap",
                          }}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          style={{
                            borderLeft: "4px solid #ccc",
                            margin: "1em 0",
                            paddingLeft: "1em",
                            fontStyle: "italic",
                            color: "#666",
                          }}
                          {...props}
                        >
                          {props.children}
                        </blockquote>
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          style={{
                            paddingLeft: "1.5em",
                            marginBottom: "1em",
                            listStyleType: "disc",
                          }}
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          style={{
                            paddingLeft: "1.5em",
                            marginBottom: "1em",
                            listStyleType: "decimal",
                          }}
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          style={{
                            marginBottom: "0.5em",
                            position: "relative",
                            paddingLeft: "1.5em",
                          }}
                          {...props}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "0",
                              top: "1em",
                              width: "0.38em",
                              height: "0.38em",
                              backgroundColor: "#333",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          />
                          {props.children}
                        </li>
                      ),
                    }}
                  >
                    {element.message}
                  </ReactMarkdown>
                ) : (
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      borderRadius: "7px",
                      backgroundColor: "#333",
                    }}
                    className={styles.cursor}
                  ></div>
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
            <Input chat_id={chat_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBasicInterface;
