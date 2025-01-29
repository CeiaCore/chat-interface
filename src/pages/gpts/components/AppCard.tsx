import { PiChatTeardropText } from "react-icons/pi";
import styles from "./AppCard.module.css";
import { Dispatch, SetStateAction } from "react";

interface AppCardProps {
  app: unknown;
  onclick: () => void;
  setContentCard: Dispatch<SetStateAction>;
}

const AppCard = ({ app, onclick, setContentCard }: AppCardProps) => {
  return (
    <div
      onClick={() => {
        onclick();
        setContentCard({
          name: app?.name,
          description: app?.description,
          user_id: app?.user_id,
          id: app?.id,
        });
      }}
      className={styles.card}
    >
      <PiChatTeardropText
        className={styles.icon}
        style={{
          marginLeft: "5px",
          height: "15px",
          width: "15px",
          color: "#333",
        }}
      />
      <div className={styles.card_content}>
        <h6 className={styles.card_title}>{app.name}</h6>
        <p className={styles.card_description}>{app.description}</p>
      </div>
    </div>
  );
};

export default AppCard;
