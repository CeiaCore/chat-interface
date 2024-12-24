import styles from "./ButtonForms.module.css";

interface ButtonFormsProps {
  value: string;
  functions: () => void;
}

const ButtonUpload = ({ value, functions }: ButtonFormsProps) => {
  return (
    <button
      onClick={() => {
        functions();
      }}
      className={styles.button}
    >
      {value}
    </button>
  );
};

export default ButtonUpload;
