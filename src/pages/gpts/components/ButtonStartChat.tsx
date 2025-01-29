import { PiChatTeardropText } from "react-icons/pi";
import styles from "./ButtonStartChat.module.css";
import { Link } from "react-router-dom";

interface ButtonStartChatProps {
  value: string;
  to: string;
}
const ButtonStartChat = ({ value, to }: ButtonStartChatProps) => {
  return (
    <Link to={to}>
      <button className={styles.button}>
        <PiChatTeardropText
          style={{
            marginLeft: "5px",
            height: "20px",
            width: "20px",
            color: "#fff",
          }}
        />
        {value}
      </button>
    </Link>
  );
};

export default ButtonStartChat;
