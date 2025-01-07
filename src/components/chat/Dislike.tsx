import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Ícone de fechar
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
  {
    label: "Referências recuperadas estão incorretas",
    value: "source_incorrect",
  },
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
        sx: {
          borderRadius: "15px",
          paddingTop: 1,
          paddingBottom: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "600",
          fontSize: "1.125rem;",
          fontFamily:
            "ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica,Apple Color Emoji,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Forneça feedback adicional
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "#333",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
            "& .MuiInput-underline:before": { borderBottomColor: "#333" },
            "& .MuiInput-underline:after": { borderBottomColor: "#333" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#333",
            },
            "& .MuiFormLabel-root": { color: "#333" },
            "& .MuiFormLabel-root.Mui-focused": { color: "#333" },
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
            "& .MuiInput-underline:before": { borderBottomColor: "#333" },
            "& .MuiInput-underline:after": { borderBottomColor: "#333" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#333",
            },
            "& .MuiFormLabel-root": { color: "#333" },
            "& .MuiFormLabel-root.Mui-focused": { color: "#333" },
          }}
        />
      </DialogContent>
      <DialogActions
        style={{
          paddingRight: "20px",
        }}
      >
        <Button
          style={{
            color: "#fff",
            backgroundColor: "#333",
            borderRadius: "10px",
            fontSize: ".85rem",
            fontWeight: "600",
            fontFamily:
              "ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica,Apple Color Emoji,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol",
          }}
          type="submit"
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
