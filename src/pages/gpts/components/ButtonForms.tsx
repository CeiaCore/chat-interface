import styles from "./ButtonForms.module.css";

interface ButtonFormsProps {
  value: string;
  functions: () => void;
}

const ButtonForms = ({ value, functions }: ButtonFormsProps) => {
  return (
    <button
      type="submit"
      onClick={() => {
        functions();
      }}
      className={styles.button}
    >
      {value}
    </button>
  );
};

export default ButtonForms;
