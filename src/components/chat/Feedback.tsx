import { Tooltip } from "@mui/material";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";
import styles from "./Feedback.module.css";
import { FaRedoAlt } from "react-icons/fa";
import { CgRedo } from "react-icons/cg";
import { MdContentCopy } from "react-icons/md";
import { useContext } from "react";
import { ContextChat } from "../../context/ChatContext";
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
  const { stateChat } = useContext(ContextChat) || {};
  return (
    <>
      {stateChat && !stateChat?.loading_generate_llm && (
        <div className={styles.icons}>
          <Tooltip title="Copiar conteúdo" arrow placement="top">
            <span>
              <MdContentCopy
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

          <Tooltip title="Gerar nova resposta" arrow placement="top">
            <span>
              <CgRedo
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  cursor: "pointer",
                }}
              />
            </span>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Feedback;
