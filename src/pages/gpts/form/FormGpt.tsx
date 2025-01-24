import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Snackbar,
  Stack,
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
import { IoIosCloseCircle, IoMdInformationCircleOutline } from "react-icons/io";
import { IoChevronBackOutline, IoDocumentTextOutline } from "react-icons/io5";
import { ClassicSpinner } from "react-spinners-kit";
import { Edit } from "@mui/icons-material";
import { AntSwitch } from "../components/Switch";
import Loading from "../components/Loading";
const FormGpt = () => {
  const [files, setFiles] = React.useState<File[]>([]); // Gerenciar arquivos carregados
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<Record<string, any>>({});
  const [tabIndex, setTabIndex] = React.useState(0);

  const chat_props: ChatBasicInterfaceProps = {
    chat_id: "chat_id",
    LOGO_CHAT: "",
  };

  const handleFileUpload = (selectedFiles: File[]) => {
    // const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 5) {
      setError("Você pode carregar no máximo 5 arquivos.");
      return;
    }

    setFiles((prevItems) => [...prevItems, ...selectedFiles]);
    uploadFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const uploadFiles = async (selectedFiles: File[]) => {
    const formData = new FormData();
    formData.append("id", "unique_session_id");

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/knowledge_router/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        listenToProgress("unique_session_id");
      } else {
        setError("Erro ao enviar os arquivos.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  const listenToProgress = (sessionId: string) => {
    const eventSource = new EventSource(
      `http://localhost:8000/api/v1/knowledge_router/progress/?id=${sessionId}`
    );
    let counter = 0;
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      counter += 0.01;

      setProgress((prev) => ({
        ...prev,
        [data.filename]: {
          stage: data.stage,
          progress: data.progress + counter,
        },
      }));
    };

    eventSource.onerror = () => {
      // setError("Erro ao obter progresso dos arquivos.");
      eventSource.close();
    };
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.form}>
            <ul className={styles.tabs}>
              <li
                onClick={() => {
                  setTabIndex(0);
                }}
                className={`${styles.tab} ${tabIndex === 0 && styles.active}`}
              >
                Sessão
              </li>
              <li
                onClick={() => {
                  setTabIndex(1);
                }}
                className={`${styles.tab} ${tabIndex === 1 && styles.active}`}
              >
                Configurações
              </li>
            </ul>
            <form style={{ marginTop: "40px" }}>
              {/* <form onSubmit={handleSubmit}> */}
              {/* <Grid style={{ backgroundColor: "red" }} mt={2} container spacing={2}> */}

              <p className={styles.description}>
                <IoMdInformationCircleOutline
                  size={20}
                  style={{ color: "#bebebe" }}
                />{" "}
                Defina as instruções do agente e carregue arquivos para a base
                de conhecimento.
              </p>
              <div>
                {tabIndex === 1 && (
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
                      InputLabelProps={{
                        style: {
                          fontSize: "0.9rem", // Tamanho da fonte do label
                        },
                      }}
                      // value={formValues.title}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>
                )}
                {tabIndex === 1 && (
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
                      InputLabelProps={{
                        style: {
                          fontSize: "0.9rem", // Tamanho da fonte do label
                        },
                      }}
                      // value={formValues.title}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>
                )}

                <Grid mt={2} item xs={12}>
                  <h6 className={styles.text_label}>Instruções</h6>
                  <TextField
                    label="Forneça uma instrução para o seu agente. O que ele pode fazer? O que ele deve evitar?"
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
                    InputLabelProps={{
                      style: {
                        fontSize: "0.9rem", // Tamanho da fonte do label
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
                    // onUpload={(uploadedFiles) => {
                    //   if (uploadedFiles) {
                    //     handleFileUpload(Array.from(uploadedFiles));
                    //   }
                    // }}

                    onUpload={(uploadedFiles) => {
                      if (uploadedFiles) {
                        handleFileUpload(Array.from(uploadedFiles));
                      }
                    }}

                    // onUpload={(uploadedFiles) => {
                    //   if (!uploadedFiles) return;

                    //   const selectedFiles = Array.from(uploadedFiles);

                    //   if (files.length + selectedFiles.length > 5) {
                    //     setError("Você pode carregar no máximo 5 arquivos.");
                    //     return;
                    //   }
                    //   console.log("AQUIIII", selectedFiles);

                    //   setFiles([...files, ...selectedFiles]);
                    //   uploadFiles();
                    // }}
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
                          opacity:
                            progress &&
                            progress[file.name] &&
                            !(progress[file.name]?.progress < 100)
                              ? "1"
                              : ".5",
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
                          {progress[file.name]?.progress &&
                            !(progress[file.name]?.progress < 100) && (
                              <IoIosCloseCircle
                                style={{ cursor: "pointer" }}
                                onClick={() => removeFile(index)}
                                size={"20px"}
                              />
                            )}
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
                          {progress &&
                          progress[file.name]?.progress &&
                          !(progress[file.name]?.progress < 100) ? (
                            <IoDocumentTextOutline
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#fff",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                height: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CircularProgress
                                size={25}
                                style={{ color: "#fff" }}
                                variant="determinate"
                                value={
                                  (progress &&
                                    progress[file.name] &&
                                    progress[file.name].progress) ||
                                  2
                                }
                              />
                            </div>
                          )}
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
                          {file?.name}
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
                {tabIndex === 1 && (
                  <Grid mt={4} item xs={12}>
                    <h6 className={styles.text_label}>Salvar</h6>
                    <Stack
                      mt={2}
                      mb={2}
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <AntSwitch inputProps={{ "aria-label": "ant design" }} />
                      <Typography fontSize={14}>
                        Disponibilizar o agente para acesso público
                      </Typography>
                    </Stack>
                    <ButtonForms functions={() => {}} value="Submeter Agente" />
                  </Grid>
                )}
              </div>
              {/* </Grid> */}
            </form>
          </div>
          <div className={styles.pre_chat}>
            <PreChatInterface props={chat_props} />
          </div>
        </div>
      )}
    </>
  );
};

export default FormGpt;
