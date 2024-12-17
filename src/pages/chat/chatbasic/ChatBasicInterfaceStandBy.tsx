import styles from "./ChatBasicInterface.module.css";
import Logo from "../../../assets/logos/chat_logo.png";

import ReactMarkdown from "react-markdown";
import React, { useContext } from "react";
import { ContextChat } from "../../../context/ChatContext";
import InputStandBy from "../../../components/chat/InputStandBy";
import { useNavigate } from "react-router-dom";
import useCreateChat from "../../../hooks/chat/useCreateChat";
import useInteract from "../../../hooks/chat/useInteraction";
import useGetAllMethod from "../../../hooks/chat/useGetAllMethod";

interface ChatBasicInterfaceStandByProps {
  user_id: string;
}
const ChatBasicInterfaceStandBy = ({
  user_id,
}: ChatBasicInterfaceStandByProps) => {
  const { stateChat } = useContext(ContextChat) || {};
  const { getData } = useGetAllMethod();

  const { createChat } = useCreateChat();

  const navigate = useNavigate();

  const { interactChat } = useInteract();

  React.useEffect(() => {
    console.log("AQUIIi", user_id);

    if (stateChat?.messages.length !== 0 && user_id) {
      createChat({ user_id: user_id }).then((result) => {
        if (result?.chat_id) {
          navigate(`/c/${result?.chat_id}`);
          const message = stateChat?.messages[0]?.message;
          getData({ user_id: user_id });
          if (message) {
            interactChat({
              query: message,
              chat_id: result?.chat_id,
            });
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        {stateChat?.messages?.length !== 0 && (
          <>
            {stateChat?.messages?.map((element) => (
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
                          li: ({ ...props }) => (
                            <li
                              style={{
                                listStyleType: "none",
                                position: "relative",
                                paddingLeft: "1.5em",
                                marginBottom: "0.5em",
                              }}
                              {...props}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  top: "0.85em",
                                  width: "0.4em",
                                  height: "0.4em",
                                  backgroundColor: "#333",
                                  borderRadius: "50%",
                                  content: '""',
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
                  </div>
                )}
              </>
            ))}
          </>
        )}

        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <InputStandBy />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBasicInterfaceStandBy;
