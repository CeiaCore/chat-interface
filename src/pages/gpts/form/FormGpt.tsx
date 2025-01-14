import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./FormGpt.module.css";
import ButtonForms from "../components/ButtonForms";
import ButtonUpload from "../components/ButtonUpload";
import PreChatInterface, {
  ChatBasicInterfaceProps,
} from "../pre_chat/PreChatInterface";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ClassicSpinner } from "react-spinners-kit";

const FormGpt = () => {
  const [files, setFiles] = React.useState<File[]>([]); // Gerenciar arquivos carregados
  const [error, setError] = React.useState<string | null>(null);

  const chat_props: ChatBasicInterfaceProps = {
    chat_id: "chat_id",
    LOGO_CHAT: "",
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 5) {
      setError("Você pode carregar no máximo 5 arquivos.");
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h5 className={styles.title}>Configurar</h5>
        <form>
          {/* <form onSubmit={handleSubmit}> */}
          {/* <Grid style={{ backgroundColor: "red" }} mt={2} container spacing={2}> */}
          <div>
            <Grid mt={2} item xs={12}>
              <h6 className={styles.text_label}>Nome</h6>

              <TextField
                label="Nomeie seu GPT"
                name="name"
                size="small"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: "#333",
                    color: "#333",
                    borderRadius: "10px",
                    fontSize: ".95rem",
                  },
                }}
                // value={formValues.title}
                // onChange={handleChange}
                required
              />
            </Grid>
            <Grid mt={2} item xs={12}>
              <h6 className={styles.text_label}>Descrição</h6>

              <TextField
                label="Adicione uma descrição sobre seu GPT"
                name="description"
                size="small"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: "#333",
                    color: "#333",
                    borderRadius: "10px",
                    fontSize: ".95rem",
                  },
                }}
                // value={formValues.title}
                // onChange={handleChange}
                required
              />
            </Grid>
            <Grid mt={2} item xs={12}>
              <h6 className={styles.text_label}>Prompt</h6>
              <TextField
                label="Forneça uma instrução para o seu GPT. O que ele pode fazer? O que ele deve evitar?"
                name="prompt"
                fullWidth
                multiline
                rows={5}
                InputProps={{
                  style: {
                    borderColor: "#333",
                    color: "#333",
                    borderRadius: "10px",
                    fontSize: ".95rem",
                  },
                }}
                // value={formValues.detail}
                // onChange={handleChange}
                required
              />
            </Grid>

            <Grid mt={2} item xs={12}>
              <h6 className={styles.text_label}>Base de Conhecimento</h6>
              <ButtonUpload
                value="Carregar Arquivos"
                allowedTypes={[
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
                onUpload={(uploadedFiles) => {
                  if (!uploadedFiles) return;

                  const selectedFiles = Array.from(uploadedFiles);
                  if (files.length + selectedFiles.length > 5) {
                    setError("Você pode carregar no máximo 5 arquivos.");
                    return;
                  }

                  setFiles([...files, ...selectedFiles]);
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
              <div
                style={{
                  width: "600px",
                  borderRadius: "10px",
                  paddingTop: "5px",
                  display: "flex",
                  marginTop: "20px",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {files.map((file, index) => (
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "#333",
                      marginLeft: "10px",
                      marginBottom: "10px",
                      marginTop: "5px",
                      // backgroundColor: "#fff",
                      backgroundColor: "#fefefe",
                      width: "200px",
                      display: "flex",
                      alignItems: "center",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "5px",
                      gap: "10px",
                      position: "relative",
                      border: "1px solid #dddddd",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "-5px",
                        top: "-5px",
                      }}
                    >
                      <IoIosCloseCircle
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFile(index)}
                        size={"20px"}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#0385ff",
                        height: "100%",
                        borderRadius: "5px",
                        width: "40px",
                        justifyContent: "center",
                      }}
                    >
                      <IoDocumentTextOutline
                        style={{ width: "20px", height: "20px", color: "#fff" }}
                      />
                    </div>
                    <p
                      style={{
                        margin: "0",
                        fontFamily: "Inter",
                        fontWeight: "500",
                        textWrap: "nowrap",
                        overflow: "hidden",
                        width: "150px",
                      }}
                    >
                      {false ? (
                        <div
                          style={{
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ClassicSpinner color={"#333"} size={15} />
                        </div>
                      ) : (
                        file.name
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Grid>

            {/* <Grid sx={{ display: "fle" }} mt={2} item xs={12}>
              <h6 className={styles.text_label}>Ferramentas</h6>
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={gilad}
                        // onChange={handleChange}
                        name="gilad"
                      />
                    }
                    label="Buscar na Web"
                    classes={{
                      label: styles.label,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={jason}
                        // onChange={handleChange}
                        name="jason"
                      />
                    }
                    classes={{
                      label: styles.label,
                    }}
                    label="Referenciar fontes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={antoine}
                        // onChange={handleChange}
                        name="antoine"
                      />
                    }
                    classes={{
                      label: styles.label,
                    }}
                    label="Reflexão avançada"
                  />
                </FormGroup>
              </FormControl>
            </Grid> */}
            <Grid mt={4} item xs={12}>
              <h6 className={styles.text_label}>Concluir</h6>
              <ButtonForms functions={() => {}} value="Submeter GPT" />
            </Grid>
          </div>
          {/* </Grid> */}
        </form>
      </div>
      <div className={styles.pre_chat}>
        <PreChatInterface props={chat_props} />
      </div>
    </div>
  );
};

export default FormGpt;
