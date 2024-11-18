import styles from "./ChatBasicInterface.module.css";

import Logo from "../../../assets/logos/logodrawer.png";
import ReactMarkdown from "react-markdown";
import Feedback from "../../../components/chat/Feedback";
import Input from "../../../components/chat/Input";
import FormDialog from "../../../components/chat/Dislike";
import React, { useContext } from "react";
import { ContextChat } from "../../../context/ChatContext";
const ChatBasicInterfaceStandBy = ({ user_message }) => {
  const { stateChat } = useContext(ContextChat) || {};

  const messages = [
    {
      rule: "user",
      message: user_message,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [indexFeedback, setIndexFeedback]: any = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [feedback, setFeedback]: any = React.useState("");

  const user_id = 1;
  const chat_id = 1;
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
        {messages?.length !== 0 ? (
          <>
            {messages?.map((element: any, index: any) => (
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
                        top: "12px",
                        left: "-35px",
                        width: "30px",
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
          </>
        ) : (
          "teste"
        )}

        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <Input />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBasicInterfaceStandBy;
