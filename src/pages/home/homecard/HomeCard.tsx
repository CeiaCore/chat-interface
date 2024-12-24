import styles from "./HomeCard.module.css";
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
import InputStandByAdvanced from "../../../components/chat/InputStandByAdvanced";

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

const Card = ({ image, title, description, size }) => {
  return (
    <div className={styles.card}>
      <img src={image} className={styles.cardImage} />
      <div className={styles.cardText}>
        <h3 style={{ fontSize: size === "large" ? "1.8rem" : "1.2rem" }}>
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const HomeCard = ({
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
          {/* Header */}

          {/* Seção principal */}
          <h2 className={styles.headerText}>É ótimo ver você</h2>
          <div className={styles.cardLayout}>
            {/* Card grande do lado esquerdo */}
            <Card
              image="https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg"
              title="Obtenha receitas para qualquer tipo de restrição alimentar"
              size="large"
            />

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              <Card
                image="https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg"
                title="Obtenha um plano de exercícios"
                size="small"
              />
              <Card
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XdCTkQbdHUwEoS4qyka8twyh2Au3yL_rgNA23rzSZ3jcfLjqCjnHE2uDzQGc5oC7KfM&usqp=CAU"
                title="Encontre uma receita que contenha os itens em sua geladeira"
                size="small"
              />
            </div>
          </div>

          {/* Rodapé */}
          <h3 className={styles.footerText}>
            Tópicos que pensei que você gostaria
          </h3>
          <div className={styles.cardLayout}>
            {/* Card grande do lado esquerdo */}
            <Card
              image="https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg"
              title="Obtenha receitas para qualquer tipo de restrição alimentar"
              size="large"
            />

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              <Card
                image="https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg"
                title="Obtenha um plano de exercícios"
                size="small"
              />
              <Card
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XdCTkQbdHUwEoS4qyka8twyh2Au3yL_rgNA23rzSZ3jcfLjqCjnHE2uDzQGc5oC7KfM&usqp=CAU"
                title="Encontre uma receita que contenha os itens em sua geladeira"
                size="small"
              />
            </div>
          </div>
          {/* Rodapé */}
          <h3 className={styles.footerText}>Algo novo</h3>
          <div className={styles.cardLayout}>
            {/* Card grande do lado esquerdo */}
            <Card
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCsDMrv91E_loKEaMsL8OCIatJMiGWxOgow&s"
              title="Obtenha receitas para qualquer tipo de restrição alimentar"
            />

            {/* Cards pequenos empilhados */}
            <div className={styles.smallCardsColumn}>
              <Card
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCsDMrv91E_loKEaMsL8OCIatJMiGWxOgow&s"
                title="Obtenha um plano de exercícios"
                size="small"
              />
              <Card
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCsDMrv91E_loKEaMsL8OCIatJMiGWxOgow&s"
                title="Encontre uma receita que contenha os itens em sua geladeira"
                size="small"
              />
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

export default HomeCard;
