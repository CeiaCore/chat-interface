import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import styles from "./GPTs.module.css";
import AppCard from "./components/AppCard";
import CategoryCard from "./components/CategoryCard";
import { IoSearch } from "react-icons/io5";
import ButtonCustom from "./components/ButtonCustom";
import { Checklist, Close } from "@mui/icons-material";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonForms from "./components/ButtonForms";
import ButtonStartChat from "./components/ButtonStartChat";
import { FiEdit } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import useCreatePreChat from "../../hooks/knowledge/useCreatePreChat";
import { ContextAuth } from "../../context/AuthContext";
import { ContextChat } from "../../context/ChatContext";
import { GooSpinner } from "react-spinners-kit";
import useGetKnowledgeByUser from "../../hooks/knowledge/useGetKnowledgeByUser";
import useGetAllKnowledge from "../../hooks/knowledge/useGetAllPublicKnwledge";
const GPTs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const { stateAuth } = useContext(ContextAuth) || {};
  const { stateChat } = useContext(ContextChat) || {};
  const [contentCard, setContentCard] = useState({
    name: "",
    description: "",
    user_id: "",
    id: "",
  });
  const { createPreChat } = useCreatePreChat();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { knowledges } = useGetKnowledgeByUser({
    user_id: stateAuth?.user.user_id,
  });
  const { public_knowledges } = useGetAllKnowledge();

  const featuredApps = [
    {
      name: "Sumarizador",
      description:
        "Resumidor de Texto é uma ferramenta online que agrupa um texto em um comprimento curto especificado. Ele condensa um longo artigo aos pontos principais.",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      name: "Analisador de Dados",
      description:
        "Drope qualquer arquivo e veja como posso ajudar a analizar e visualizar seus dados.",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
  ];

  const handleCreatePreChat = () => {
    createPreChat({
      user_id: stateAuth?.user.user_id,
    }).then((result) => {
      if (result && result.chat_id) {
        navigate(`/gpts/edit/${result.chat_id}`);
      }
    });
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <h4 className={styles.title}>Explore Agentes</h4>
        <p className={styles.subtitle}>
          Crie versões personalizadas do seu Chat que combinam instruções,
          conhecimento extra e qualquer combinação de habilidades.
        </p>
        <ButtonCustom
          handleFunction={() => {
            handleCreatePreChat();
          }}
          value={stateChat?.loading ? "Iniciando..." : "Iniciar agente"}
        />
        <Box className={styles.searchSection}>
          <TextField
            placeholder="Buscar Agente"
            variant="outlined"
            size="medium"
            fullWidth
            style={{ borderRadius: "80px" }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "15px",
                  width: "60%",
                  borderColor: "rgb(223, 223, 223)", // Cor da borda padrão
                },
                "&:hover fieldset": {
                  borderColor: "rgb(223, 223, 223)", // Cor da borda no hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgb(233, 233, 233)", // Cor da borda ao focar
                },
              },
            }}
            className={styles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch style={{ color: "rgb(150, 150, 150)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        {stateAuth?.user.user_id === contentCard.user_id && (
          <Link to={"/gpts/edit"}>
            <Tooltip title="Editar Agente" arrow placement="right">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={{ position: "absolute", left: 8, top: 8 }}
              >
                <FiEdit style={{ color: "#333", width: "20px" }} />
              </IconButton>
            </Tooltip>
          </Link>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          {false ? (
            <div className={styles.dialog_loading}>
              <CircularProgress style={{ color: "#333" }} size={"30px"} />
            </div>
          ) : (
            <>
              <div className={styles.box_title}>
                <h3>{contentCard.name}</h3>
              </div>
              <div className={styles.author}>
                <p>By User</p>
              </div>
              <div className={styles.description}>
                <p>{contentCard.description}</p>
              </div>
              {/* 
              <div className={styles.capabilities}>
                <h5>Capacidades</h5>
                <li className={styles.items}>
                  <FaRegCheckCircle color={"rgb(0, 138, 7)"} /> Buscar na web
                </li>
                <li className={styles.items}>
                  <FaRegCheckCircle color={"rgb(0, 138, 7)"} /> Buscar na web
                </li>
                <li className={styles.items}>
                  <FaRegCheckCircle color={"rgb(0, 138, 7)"} /> Buscar na web
                </li>
              </div> */}

              <ButtonStartChat
                to={`/g/${contentCard.id}`}
                value="Iniciar Chat"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <Tabs
        value={activeTab}
        className={styles.tabs}
        onChange={handleTabChange}
        style={{
          backgroundColor: "#F8F8F8",
          width: "225px",
          borderRadius: "10px",
        }}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#727272", // Altere a cor da borda inferior aqui
          },

          "& .Mui-selected": {
            color: "#333", // Cor do texto da aba selecionada
            backgroundColor: "#F1F1F1",
          },
        }}
      >
        <Tab
          style={{
            fontSize: ".8rem",
            color: "#333", // Cor do texto da aba selecionada
            fontFamily: "Inter",
          }}
          label="Geral"
        />
        <Tab
          style={{
            color: "#333", // Cor do texto da aba selecionada
            fontFamily: "Inter",
            fontSize: ".8rem",
          }}
          label="Meus Agentes"
        />
      </Tabs>
      {false && (
        <div
          style={{
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          <LinearProgress
            style={{ opacity: "30%", marginTop: "40px", borderRadius: "10px" }}
            color="inherit"
          />
        </div>
      )}
      {activeTab === 0 && (
        <div className={styles.container_topics}>
          {public_knowledges.length > 0 && (
            <>
              <h5 className={styles.title_topics}>Agentes Públicos</h5>
              <div className={styles.container_cards}>
                {public_knowledges.map((app) => (
                  <AppCard
                    setContentCard={setContentCard}
                    onclick={handleOpen}
                    app={app}
                  />
                ))}
              </div>
            </>
          )}
          <h5 style={{ marginTop: "30px" }} className={styles.title_topics}>
            Por Ceia
          </h5>
          <div style={{ opacity: "50%" }} className={styles.container_cards}>
            {featuredApps.map((app, index) => (
              <AppCard onclick={() => {}} app={app} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <>
          <div className={styles.container_topics}>
            <h5 style={{ marginTop: "30px" }} className={styles.title_topics}>
              Públicos
            </h5>
            <div className={styles.container_cards}>
              {knowledges.length > 0 && (
                <>
                  <div className={styles.container_cards}>
                    {knowledges.map((app) => (
                      <>
                        {!app?.private && (
                          <AppCard
                            setContentCard={setContentCard}
                            onclick={handleOpen}
                            app={app}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h5 style={{ marginTop: "30px" }} className={styles.title_topics}>
              Privados
            </h5>
            <div className={styles.container_cards}>
              {knowledges.length > 0 && (
                <>
                  <div className={styles.container_cards}>
                    {knowledges.map((app) => (
                      <>
                        {app?.private && (
                          <AppCard
                            setContentCard={setContentCard}
                            onclick={handleOpen}
                            app={app}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default GPTs;
