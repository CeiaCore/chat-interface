import { TbWorld } from "react-icons/tb";
import styles from "./Reference.module.css";

interface ReferenceProps {
  data: {
    link: string;
    content: string;
    title: string;
  };
  type: string;
}

const LinkReference = ({ reference }: { reference: ReferenceProps }) => {
  return (
    <a href={reference.data.link} target="_blank">
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
          <p className={styles.reference_title}>{reference.data.title}</p>
        </div>
        <p style={{ fontSize: ".7rem" }}>{reference.data.link}</p>
        <p style={{ fontSize: ".85rem", height: "200px" }}>
          {reference.data.content}
        </p>
      </li>
    </a>
  );
};

export default LinkReference;
