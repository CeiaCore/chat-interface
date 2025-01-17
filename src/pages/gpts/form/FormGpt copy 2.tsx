import React, { useState } from "react";
import {
  Alert,
  Grid,
  Snackbar,
  Typography,
  LinearProgress,
} from "@mui/material";
import ButtonUpload from "../components/ButtonUpload";
import styles from "./FormGpt.module.css";

const FormGpt = () => {
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleFileUpload = async (selectedFiles: File[]) => {
    const formData = new FormData();
    formData.append("id", "12345");
    formData.append("reset", "true");
    formData.append("prompt", "Iniciar o processamento do PDF");
    formData.append("files", selectedFiles[0]); // Apenas um arquivo de exemplo

    try {
      // Envia os arquivos para o backend
      const response = await fetch(
        "http://localhost:8000/api/v1/knowledge_router/pre-chat/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar o arquivo");
      }

      // Após o envio, conecta ao endpoint de progresso
      const eventSource = new EventSource(
        `http://localhost:8000/api/v1/knowledge_router/progress/?id=12345`
      );
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("AQUIIIIIIII", data);
        console.log("AQUIIIIIIII", data);
        console.log("AQUIIIIIIII", data);
        console.log("AQUIIIIIIII", data);

        setProgress(data.progress || 0);
        setStatusMessage(data.stage || "");

        if (data.progress === 100) {
          eventSource.close();
        }
      };

      eventSource.onerror = () => {
        setError("Erro na conexão com o servidor.");
        eventSource.close();
      };
    } catch (err) {
      setError("Erro ao submeter os dados.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Typography variant="h5" className={styles.title}>
          Configurar
        </Typography>
        <Grid mt={2} item xs={12}>
          <Typography variant="h6" className={styles.text_label}>
            Base de Conhecimento
          </Typography>
          <ButtonUpload
            value="Carregar Arquivos"
            allowedTypes={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            onUpload={(uploadedFiles) => {
              if (uploadedFiles) {
                handleFileUpload(Array.from(uploadedFiles));
              }
            }}
          />
          <Snackbar
            open={!!error}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={4000}
            onClose={() => setError(null)}
          >
            <Alert
              variant="filled"
              severity="error"
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Snackbar>
        </Grid>

        <div className={styles.progressContainer}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography>{statusMessage}</Typography>
        </div>
      </div>
    </div>
  );
};

export default FormGpt;
