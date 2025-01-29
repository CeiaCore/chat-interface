import { PiChatTeardropText } from "react-icons/pi";
import styles from "./HomeKnowledge.module.css";
import InputStandByAdvanced from "../../../components/chat/InputStandByAdvanced";
import useGetKnowledgeById from "../../../hooks/knowledge/useGetKnowledgeById";
import { useParams } from "react-router-dom";
import ChatKnowledgeInterfaceStandBy from "../../gpts/components/ChatKnowledgeInterfaceStandBy";
import { useState } from "react";

const HomeKnowledge = () => {
  const { knowledge_id } = useParams();

  const { knowledges } = useGetKnowledgeById({
    knowledge_id: knowledge_id,
  });
  const [state, setState] = useState(true);

  return (
    <>
      {state && (
        <div className={styles.container}>
          {knowledges && (
            <>
              <PiChatTeardropText
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "10%",
                  height: "40px",
                  width: "40px",
                  color: "rgb(29, 29, 29)",
                }}
              />
              <h2 className={styles.name}>{knowledges?.name}</h2>
              <p className={styles.by}>Por USER</p>
              <p className={styles.description}>{knowledges?.description}</p>

              <div
                className={`${styles.inputContainer} fade-in`} // Adiciona classe de animação
              >
                <div className={styles.input}>
                  <InputStandByAdvanced />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!state && (
        <ChatKnowledgeInterfaceStandBy
          user_id={stateAuth?.user.user_id || ""}
        />
      )}
    </>
  );
};

export default HomeKnowledge;
