import { FaRegFilePdf } from "react-icons/fa";
import styles from "./Reference.module.css";

const PdfReference = () => {
  return (
    <li className={styles.reference}>
      <div className={styles.header_reference}>
        <FaRegFilePdf />
        Nome do arquivo
      </div>
      <p style={{ fontSize: ".7rem" }}>Pagina 32</p>
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

export default PdfReference;
