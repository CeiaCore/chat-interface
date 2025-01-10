import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./FormGpt.module.css";
import ButtonForms from "../components/ButtonForms";
import ButtonUpload from "../components/ButtonUpload";
import PreChatInterface, {
  ChatBasicInterfaceProps,
} from "../pre_chat/PreChatInterface";

const FormGpt = () => {
  const chat_props: ChatBasicInterfaceProps = {
    chat_id: "chat_id",
    LOGO_CHAT: "",
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
              <ButtonUpload functions={() => {}} value="Carregar Arquivos" />
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
