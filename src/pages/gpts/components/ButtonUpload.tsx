import { Alert, Snackbar } from "@mui/material";
import styles from "./ButtonForms.module.css";
import React from "react";

interface ButtonUploadProps {
  value: string;
  onUpload: (files: FileList | null) => void;
  allowedTypes: string[]; // Tipos permitidos de arquivos
}

const ButtonUpload = ({ value, onUpload, allowedTypes }: ButtonUploadProps) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Filtra os arquivos para garantir que sejam dos tipos permitidos
    const validFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    // Se nenhum arquivo válido for encontrado, exibe um erro
    if (validFiles.length === 0) {
      setError("Somente arquivos PDF, DOC ou DOCX são permitidos.");
      return;
    }

    onUpload(validFiles);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <Snackbar
        open={!!error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert variant="filled" severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <label className={styles.button} style={{ cursor: "pointer" }}>
        {value}
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ButtonUpload;
