import styles from "./Reference.module.css";
import { IoLink } from "react-icons/io5";

const LinkReference = ({ reference }) => {
  return (
    <li className={styles.reference}>
      <div className={styles.header_reference}>
        <IoLink />
        Nome do arquivo
      </div>
      <p style={{ fontSize: ".7rem" }}>{reference.data.link}</p>
      <p>
        Aqui contem os chunks dos documentos recuperados Aqui contem osdas as
        dsd chunks dos documentos recuperados Aqui contem os chunks dosasd asd
        documentos recuperados Aqui contem os chunks dos documentos ads
        recuperados Aqui contem os chunks dos documentos recuperadosasd Aqui
        contem os chunks dos documentos recuperados
      </p>
    </li>
  );
};

export default LinkReference;
