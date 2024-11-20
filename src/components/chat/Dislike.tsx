import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./Dislike.module.css";

type FeedbackOptions = {
  label: string;
  value: string;
};

interface Metadata {
  retrieved_context: string;
  llm_response: string;
  user_query: string;
  llm_prompt: string;
  llm_model: string;
  embedding_model: string;
  top_k: number;
  case_name: string;
  case_topics: string[];
}

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  metadata: Metadata;
  user_id: string;
  chat_id: string;
  indexFeedback: number;
  setFeedback: (index: number) => void;
}
const feedbackOptions: FeedbackOptions[] = [
  { label: "Não é factualmente correta", value: "factually_incorrect" },
  { label: "Não gostei do estilo", value: "disliked_style" },
  {
    label: "Não está usando o histórico corretamente",
    value: "incorrect_history_usage",
  },
  { label: "Resposta preguiçosa", value: "lazy_response" },
];

export default function FormDialog({
  open,
  handleClose,
  metadata,
  user_id,
  chat_id,
  indexFeedback,
  setFeedback,
}: FormDialogProps) {
  const [observation, setObservation] = React.useState("");
  const [expectedResponse, setExpectedResponse] = React.useState("");

  const handleDislike = (selectedObservation: string) => {
    const props = {
      chat_id,
      user_id,
      observation: selectedObservation,
      expected_response: expectedResponse,
      ...metadata,
    };
    // dislike_message(props); // Descomente esta linha quando implementar a função
    setFeedback(indexFeedback);
    resetForm();
  };

  const resetForm = () => {
    setObservation("");
    setExpectedResponse("");
    handleClose();
  };

  const handleOptionClick = (value: string) => {
    setObservation(value);
    handleDislike(value);
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent) => {
          event.preventDefault();
          handleDislike(observation);
        },
      }}
    >
      <DialogTitle>Forneça feedback adicional</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className={styles.box_options}>
            {feedbackOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.label)}
                className={styles.option}
              >
                {option.label}
              </div>
            ))}
          </div>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Outra observação"
          fullWidth
          variant="standard"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          sx={{
            "& .MuiInput-underline:before": { borderBottomColor: "#333" }, // Cor antes do foco
            "& .MuiInput-underline:after": { borderBottomColor: "#333" }, // Cor depois do foco
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#333",
            }, // Cor ao passar o mouse
            "& .MuiFormLabel-root": { color: "#333" }, // Cor do label
            "& .MuiFormLabel-root.Mui-focused": { color: "#333" }, // Cor do label ao focar
          }}
        />
        <TextField
          margin="dense"
          label="Resposta esperada (Opcional)"
          fullWidth
          variant="standard"
          value={expectedResponse}
          onChange={(e) => setExpectedResponse(e.target.value)}
          sx={{
            "& .MuiInput-underline:before": { borderBottomColor: "#333" }, // Cor antes do foco
            "& .MuiInput-underline:after": { borderBottomColor: "#333" }, // Cor depois do foco
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#333",
            }, // Cor ao passar o mouse
            "& .MuiFormLabel-root": { color: "#333" }, // Cor do label
            "& .MuiFormLabel-root.Mui-focused": { color: "#333" }, // Cor do label ao focar
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button style={{ color: "#333" }} onClick={handleClose}>
          Cancelar
        </Button>
        <Button style={{ color: "#333" }} type="submit">
          Submeter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
