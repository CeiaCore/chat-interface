import styles from "./HomeB.module.css";
import { useContext, useEffect, useState } from "react";
import ChatBasicInterfaceStandBy from "../../chat/chatbasic/ChatBasicInterfaceStandBy";
import { ContextChat } from "../../../context/ChatContext";
import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  LOADING_GENERATE_LLM_TRUE,
  SET_NEW_CHAT_TRUE,
} from "../../../context/types/types";
import { ContextAuth } from "../../../context/AuthContext";
import InputStandByAdvanced from "../../../components/chat/InputStandByAdvanced";
import { IHomeBConfig } from "../../../routes/custom/config/home/HomeB.config";

const Card = ({ image, title, size }) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles.cardImage} />
      <div className={styles.cardText}>
        <h3 style={{ fontSize: size === "large" ? "1.8rem" : "1.2rem" }}>
          {title}
        </h3>
      </div>
    </div>
  );
};

const HomeB = ({ home_config }: { home_config: IHomeBConfig }) => {
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
    // setState(false);
    dispatchChat({ type: SET_NEW_CHAT_TRUE });
  }
  return (
    <>
      {state && (
        <div className={styles.container}>
          {/* Header */}

          {/* Seção principal */}
          <h2 className={styles.headerText}>{home_config.starting_title}</h2>
          <div className={styles.cardLayout}>
            {home_config.session_a
              .filter((element) => element.size === "large")
              .map((card) => (
                <Card image={card.image} title={card.title} size={card.size} />
              ))}

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              {home_config.session_a
                .filter((element) => element.size === "small")
                .map((card) => (
                  <Card
                    image={card.image}
                    title={card.title}
                    size={card.size}
                  />
                ))}
            </div>
          </div>

          <h3 className={styles.footerText}>{home_config.session_b_title}</h3>
          <div className={styles.cardLayout}>
            {home_config.session_b
              .filter((element) => element.size === "large")
              .map((card) => (
                <Card image={card.image} title={card.title} size={card.size} />
              ))}

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              {home_config.session_b
                .filter((element) => element.size === "small")
                .map((card) => (
                  <Card
                    image={card.image}
                    title={card.title}
                    size={card.size}
                  />
                ))}
            </div>
          </div>
          {/* Rodapé */}
          <h3 className={styles.footerText}>{home_config.session_c_title}</h3>
          <div className={styles.cardLayout}>
            {home_config.session_c
              .filter((element) => element.size === "large")
              .map((card) => (
                <Card image={card.image} title={card.title} size={card.size} />
              ))}

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              {home_config.session_c
                .filter((element) => element.size === "small")
                .map((card) => (
                  <Card
                    image={card.image}
                    title={card.title}
                    size={card.size}
                  />
                ))}
            </div>
          </div>
          <div
            className={`${styles.inputContainer} fade-in`} // Adiciona classe de animação
          >
            <div className={styles.input}>
              <InputStandByAdvanced setState={setState} />
            </div>
          </div>
        </div>
      )}
      {!state && (
        <ChatBasicInterfaceStandBy user_id={stateAuth?.user.user_id || ""} />
      )}
    </>
  );
};

export default HomeB;
