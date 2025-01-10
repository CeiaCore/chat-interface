import { PiChatTeardropText } from "react-icons/pi";
import styles from "./AppCard.module.css";

interface AppCardProps {
  app: unknown;
  onclick: () => void;
}

const AppCard = ({ app, onclick }: AppCardProps) => {
  console.log(onclick);

  return (
    <div
      onClick={() => {
        onclick();
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
        <h6 className={styles.card_title}>{app.title}</h6>
        <p className={styles.card_description}>{app.description}</p>
      </div>
    </div>
  );
};

export default AppCard;
