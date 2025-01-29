import styles from "./Button.module.css";

interface ButtonCustom {
  value: any;
  handleFunction: () => void;
}

const ButtonCustom = ({ handleFunction, value }: ButtonCustom) => {
  return (
    <button
      onClick={() => {
        handleFunction();
      }}
      className={styles.button}
    >
      {value}
    </button>
  );
};

export default ButtonCustom;
