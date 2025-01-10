import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
const GPTs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const featuredApps = [
    {
      title: "ChatGPT",
      description: "AI model that engages in human-like conversations.",
      likes: "78.9K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "ChatGPT",
      description: "AI model that engages in human-like conversations.",
      likes: "78.9K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "ChatGPT",
      description: "AI model that engages in human-like conversations.",
      likes: "78.9K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "ChatGPT",
      description: "AI model that engages in human-like conversations.",
      likes: "78.9K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "DALL-E",
      description: "Creates images from textual descriptions using AI.",
      likes: "52.3K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "Jasper AI",
      description: "Assists in creating written content using AI.",
      likes: "36.7K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "GitHub Copilot",
      description: "AI tool that offers coding suggestions for developers.",
      likes: "64.1K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "GitHub Copilot",
      description:
        "AI tool that offers coding suggestions for developers. AI tool that offers coding suggestions for developers. AI tool that offers coding suggestions for developers. AI tool that offers coding suggestions for developers.",
      likes: "64.1K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
    {
      title: "GitHub Copilot",
      description: "AI tool that offers coding suggestions for developers.",
      likes: "64.1K",
      img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
    },
  ];

  const myGpts = {
    public: [
      {
        title: "Public GPT 1",
        description: "A public GPT example.",
        likes: "10.2K",
        img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
      },
    ],
    private: [
      {
        title: "Private GPT 1",
        description: "A private GPT example.",
        likes: "5.6K",
        img: "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
      },
    ],
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <h4 className={styles.title}>Explore Agentes</h4>
        <p className={styles.subtitle}>
          Crie versões personalizadas do seu Chat que combinam instruções,
          conhecimento extra e qualquer combinação de habilidades.
        </p>
        <ButtonCustom value="Criar agente" to="/gpts/edit" />
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
        <Tooltip title="Opções" arrow placement="right">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", left: 40, top: 8 }}
          >
            <IoMdMore style={{ color: "#333", width: "20px" }} />
          </IconButton>
        </Tooltip>
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
              <div className={styles.box_image}>
                <img src={"/teste.png"} className={styles.image} />
              </div>
              <div className={styles.box_title}>
                <h3>Um grande titulo associado</h3>
              </div>
              <div className={styles.author}>
                <p>By Alecrin</p>
              </div>
              <div className={styles.description}>
                <p>
                  By Alecrin By AlecrinBy AlecrinBy AlecrinBy AlecrinBy
                  AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy
                  AlecrinBy Alecrin By AlecrinBy AlecrinBy AlecrinBy AlecrinBy
                  AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy
                  AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy AlecrinBy
                  AlecrinBy AlecrinBy AlecrinBy Alecrin AlecrinBy AlecrinBy
                  Alecrin AlecrinBy AlecrinBy Alecrin A AlecrinBy Alecrin
                  AlecrinBy AlecrinBy Alecrin AlecrinBy AlecrinBy Alecrin
                </p>
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

              <ButtonStartChat value="Iniciar Chat" />
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
          <h5 className={styles.title_topics}>Agentes</h5>
          <div className={styles.container_cards} style={{}}>
            {featuredApps.map((app, index) => (
              <AppCard onclick={handleOpen} app={app} />
            ))}
          </div>

          <h5 style={{ marginTop: "30px" }} className={styles.title_topics}>
            Automação
          </h5>
          <div className={styles.container_cards}>
            {featuredApps.map((app, index) => (
              <AppCard onclick={handleOpen} app={app} />
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
              {myGpts.public.map((gpt, index) => (
                <AppCard onclick={handleOpen} app={gpt} />
              ))}
            </div>

            <h5 style={{ marginTop: "30px" }} className={styles.title_topics}>
              Privados
            </h5>
            <div className={styles.container_cards}>
              {myGpts.private.map((gpt, index) => (
                <AppCard onclick={handleOpen} app={gpt} />
              ))}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default GPTs;
