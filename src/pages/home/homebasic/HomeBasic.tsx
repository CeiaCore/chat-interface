import Input from "../../../components/chat/Input";
import {
  buttonsArray,
  HOME_BASIC_DESCRIPTION,
  HOME_BASIC_TITLE,
} from "../../../config/templates.conf";
import styles from "./HomeBasic.module.css";
import logo from "../../../assets/logos/logodrawer.png";
import { TbBrandGoogleBigQuery } from "react-icons/tb";
import ChatBasicInterface from "../../chat/chatbasic/ChatBasicInterface";
import { useState } from "react";

const HomeBasic = () => {
  const [teste, setTeste] = useState(false);
  return (
    <>
      {!teste && (
        <div className={styles.container}>
          <img style={{ height: "25px" }} src={logo} />
          <h1 className={styles.title}>{HOME_BASIC_TITLE}</h1>
          <p className={styles.description}>{HOME_BASIC_DESCRIPTION}</p>

          <div className={styles.buttonContainer}>
            {buttonsArray.map((element) => (
              <button className={styles.optionButton}>
                <span>{element.text}</span>
                <TbBrandGoogleBigQuery className={styles.chatIcon} />
              </button>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <Input setTeste={setTeste} />
          </div>
        </div>
      )}
      {teste && <ChatBasicInterface />}
    </>
  );
};

export default HomeBasic;
