import { Link } from "react-router-dom";
import styles from "./Button.module.css";

interface ButtonCustom {
  value: string;
  to: string;
}

const ButtonCustom = ({ value, to }: ButtonCustom) => {
  return (
    <Link to={to}>
      <button className={styles.button}>{value}</button>
    </Link>
  );
};

export default ButtonCustom;
