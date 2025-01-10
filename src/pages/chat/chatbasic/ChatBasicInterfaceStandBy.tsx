import styles from "./ChatBasicInterface.module.css";
import ReactMarkdown from "react-markdown";
import React, { useContext } from "react";
import { ContextChat } from "../../../context/ChatContext";
import InputStandBy from "../../../components/chat/InputStandBy";
import { useNavigate } from "react-router-dom";
import useCreateChat from "../../../hooks/chat/useCreateChat";
import useInteractionWithoutSmooth from "../../../hooks/chat/useInteractionWithoutSmooth";
import useGetAllMethod from "../../../hooks/chat/useGetAllMethod";
// import SkewLoader from "react-spinners/SkewLoader";
import { GooSpinner } from "react-spinners-kit";
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

  const { interactChat } = useInteractionWithoutSmooth();

  React.useEffect(() => {
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
                      <div>
                        <GooSpinner size={27} color="#333" />
                      </div>
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
