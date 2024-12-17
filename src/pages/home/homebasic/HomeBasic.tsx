import styles from "./HomeBasic.module.css";
import { TbBrandGoogleBigQuery } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import ChatBasicInterfaceStandBy from "../../chat/chatbasic/ChatBasicInterfaceStandBy";
import InputStandBy from "../../../components/chat/InputStandBy";
import { ContextChat } from "../../../context/ChatContext";
import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  LOADING_GENERATE_LLM_TRUE,
  SET_NEW_CHAT_TRUE,
} from "../../../context/types/types";
import { ContextAuth } from "../../../context/AuthContext";

interface InfoItem {
  text: string;
  query: string;
}

interface HomeBasicProps {
  HOME_BASIC_TITLE: string;
  HOME_BASIC_DESCRIPTION: string;
  CARDS: InfoItem[];
  LOGO: string;
}

const HomeBasic = ({
  config: { CARDS, HOME_BASIC_DESCRIPTION, HOME_BASIC_TITLE, LOGO },
}: {
  config: HomeBasicProps;
}) => {
  const { dispatchChat } = useContext(ContextChat) || {};
  const { stateAuth } = useContext(ContextAuth) || {};

  useEffect(() => {
    dispatchChat({ type: CLEAR_MESSAGES });
  }, []);

  const [state, setState] = useState(true);

  function handleCreateChat(text: string) {
    if (!dispatchChat) {
      return null;
    }
    const user_message = { rule: "user", message: text };
    dispatchChat({ type: ADD_MESSAGE, payload: user_message });
    dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });
    const bot_message = { rule: "bot", message: "", metadata: "" };
    dispatchChat({ type: ADD_MESSAGE, payload: bot_message });
    setState(false);
    dispatchChat({ type: SET_NEW_CHAT_TRUE });
  }
  return (
    <>
      {state && (
        <div className={styles.container}>
          <img style={{ height: "25px" }} src={LOGO} />
          <h1 className={styles.title}>{HOME_BASIC_TITLE}</h1>
          <p className={styles.description}>{HOME_BASIC_DESCRIPTION}</p>

          <div className={styles.buttonContainer}>
            {CARDS.map((element: InfoItem) => (
              <button
                onClick={() => {
                  handleCreateChat(element.query);
                }}
                className={styles.optionButton}
              >
                <span>{element.text}</span>
                <TbBrandGoogleBigQuery className={styles.chatIcon} />
              </button>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <InputStandBy setState={setState} />
          </div>
        </div>
      )}
      {!state && (
        <ChatBasicInterfaceStandBy user_id={stateAuth?.user.user_id || ""} />
      )}
    </>
  );
};

export default HomeBasic;
