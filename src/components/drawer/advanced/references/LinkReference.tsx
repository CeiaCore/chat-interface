import { TbWorld } from "react-icons/tb";
import styles from "./Reference.module.css";
import { Reference } from "../../../../context/ChatContext";

const LinkReference = ({ reference }: { reference: Reference }) => {
  function extractDomain(url: string): string | null {
    try {
      const parsedUrl = new URL(url); // Converte a string em um objeto URL
      return parsedUrl.hostname; // Retorna apenas o domínio (hostname)
    } catch (error) {
      console.error("URL inválida:", error);
      return null; // Retorna null se a URL for inválida
    }
  }

  // Exemplo de uso:
  return (
    <a href={reference?.source} target="_blank">
      <li className={styles.reference}>
        <span
          style={{
            position: "absolute",
            right: "10px",
            width: "50px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "20px",
            borderRadius: "50px",
            fontSize: ".7rem",
            fontWeight: "700",
            textAlign: "center",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          Link
        </span>
        <div className={styles.header_reference}>
          <TbWorld />
          <p className={styles.reference_title}>
            {extractDomain(reference?.source)}
          </p>
        </div>
        <p style={{ fontSize: ".7rem" }}>{reference?.source}</p>
        <p style={{ fontSize: ".85rem", height: "200px" }}>
          {reference?.content}
        </p>
      </li>
    </a>
  );
};

export default LinkReference;
