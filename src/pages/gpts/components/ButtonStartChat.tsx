import { PiChatTeardropText } from "react-icons/pi";
import styles from "./ButtonStartChat.module.css";
import { CircularProgress } from "@mui/material";

interface ButtonStartChatProps {
  value: string;
}
const ButtonStartChat = ({ value }: ButtonStartChatProps) => {
  return (
    <>
      {false ? (
        <button style={{ opacity: ".8" }} className={styles.button}>
          <CircularProgress
            style={{
              marginLeft: "5px",
              height: "20px",
              width: "20px",
              color: "#fff",
            }}
          />
          {value}
        </button>
      ) : (
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
      )}
    </>
  );
};

export default ButtonStartChat;
