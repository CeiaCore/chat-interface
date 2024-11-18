import { Tooltip } from "@mui/material";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";

import styles from "./Feedback.module.css";

interface FeedbackProps {
  handleClickOpen: () => void;
  setIndexFeedback: (index: any) => void;
  indexFeedback: [number];
  index: number;
}

const Feedback = ({
  handleClickOpen,
  setIndexFeedback,
  indexFeedback,
  index,
}: FeedbackProps) => {
  return (
    <div className={styles.icons}>
      <Tooltip title="Copiar conteúdo" arrow placement="top">
        <span>
          <IoCopyOutline
            style={{
              fontSize: 18,
              cursor: "pointer",
            }}
          />
        </span>
      </Tooltip>
      <Tooltip title="Resposta satisfatória" arrow placement="top">
        <span>
          <BiLike
            style={{
              fontSize: 18,
              marginLeft: 5,
              cursor: "pointer",
            }}
          />
        </span>
      </Tooltip>
      <Tooltip title="Resposta Insatisfatória" arrow placement="top">
        <span>
          <BiDislike
            style={{
              fontSize: 18,
              marginLeft: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickOpen();
              setIndexFeedback([...indexFeedback, index]);
            }}
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default Feedback;
