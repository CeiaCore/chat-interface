import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { useRef } from "react";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import { FaRegLightbulb } from "react-icons/fa";
import { Alert, Snackbar, Tooltip } from "@mui/material";
import { TbWorldSearch } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ContextChat } from "../../../context/ChatContext";
import {
  ACTIVE_SCROLL,
  ADD_MESSAGE,
  LOADING_GENERATE_LLM_TRUE,
} from "../../../context/types/types";
import usePreChatInteractionWithoutSmooth from "../../../hooks/knowledge/usePreChatInteractionWithoutSmooth";

interface InputProps {
  chat_id: string;
  BOT_NAME: string;
  prompt: string;
}

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#131313", // Cor do background
          padding: "5px",
          color: "white", // Cor do texto
          borderRadius: "7px",
          fontSize: "14px", // Tamanho da fonte
          paddingLeft: "10px",
          paddingRight: "10px",
        },
        arrow: {
          color: "#131313", // Cor da seta
        },
      },
    },
  },
});

export default function InputAdvancedPreChat({
  chat_id,
  BOT_NAME,
  prompt,
}: InputProps) {
  const [message, setMessage] = React.useState("");
  const { interactPreChat } = usePreChatInteractionWithoutSmooth();
  const [feature, setFeature] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]); // Gerenciar arquivos carregados
  const [error, setError] = React.useState<string | null>(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const { stateChat, dispatchChat } =
    React.useContext(ContextChat) || undefined;

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
    setIsTyping(event.target.value.length > 0);
  };

  const textareaRef = useRef();

  const handleSendMessage = () => {
    dispatchChat({ type: ACTIVE_SCROLL });
    if (message.trim() !== "") {
      const user_message = { rule: "user", message: message };
      dispatchChat({ type: ADD_MESSAGE, payload: user_message });
      dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });

      const bot_message = { rule: "bot", message: "", metadata: "" };
      dispatchChat({ type: ADD_MESSAGE, payload: bot_message });

      interactPreChat({
        chat_id: chat_id,
        prompt: prompt,
        query: message,
      });
    }

    setMessage("");
    setIsTyping(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
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

  const iconStyle = {
    transition: "transform 0.3s ease, opacity 0.3s ease, color 0.3s ease",
    opacity: isTyping ? 1 : 1,
    color: isTyping ? "#333" : "#333",
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        cursor: "text",
        padding: "10px 7px 7px 7px",
        backgroundColor: "#f4f4f4",
        // backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "rgba(255, 255, 255, 0.92) 0px 0px 30px 20px", // Sombra suave e fraca
        // border: "1px solid  #b9b9b9",
        transition: ".2s",
      }}
      onClick={(e) => {
        if (!e.target.closest(".no-focus")) {
          textareaRef.current.focus();
        }
      }}
    >
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
      <div
        style={{
          width: "600px",
          overflowX: "auto",
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
            <div style={{ position: "absolute", right: "-5px", top: "-5px" }}>
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
              {file.name}
            </p>
          </div>
        ))}
      </div>
      <div>
        <TextareaAutosize
          ref={textareaRef}
          placeholder={`Envie uma mensagem para  ${BOT_NAME}`}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          disabled={stateChat && stateChat.loading_generate_llm}
          style={{
            flex: 1,
            border: "none",
            resize: "none",
            outline: "none",
            fontWeight: 400,
            width: "95%",
            fontSize: "1rem",
            backgroundColor: "#f4f4f4",
            transition: ".1s",
            lineHeight: "1.5",
            marginTop: "5px",
            marginLeft: "10px",
            fontFamily: "system-ui",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            alignContent: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Tooltip title="Anexar arquivos" arrow placement="left">
              <IconButton
                component="label"
                color="primary"
                size="small"
                style={{ ...iconStyle, color: "#333" }}
              >
                <AttachFileRoundedIcon />
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileUpload}
                />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Tooltip title="Reflexão avançada" arrow placement="right">
              <IconButton
                color="primary"
                size="small"
                aria-label="send message"
                style={
                  feature.includes("reasoning")
                    ? { backgroundColor: "#cde5f7", ...iconStyle }
                    : { ...iconStyle }
                }
                onClick={() => {
                  if (feature.includes("reasoning")) {
                    setFeature("");
                  } else {
                    setFeature("reasoning");
                  }
                }}
                disabled={stateChat && stateChat.loading_generate_llm}
              >
                <FaRegLightbulb
                  style={
                    feature.includes("reasoning")
                      ? { color: "#0385ff" }
                      : { color: "#333" }
                  }
                />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Tooltip title="Buscar na web" arrow placement="right">
              <IconButton
                color="primary"
                size="small"
                style={
                  feature.includes("web_search")
                    ? { backgroundColor: "#cde5f7", ...iconStyle }
                    : { ...iconStyle }
                }
                aria-label="send message"
                onClick={() => {
                  if (feature.includes("web_search")) {
                    setFeature("");
                  } else {
                    setFeature("web_search");
                  }
                }}
                disabled={stateChat && stateChat.loading_generate_llm}
              >
                <TbWorldSearch
                  style={
                    feature.includes("web_search")
                      ? { color: "#0385ff" }
                      : { color: "#333" }
                  }
                />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
        </div>
        <IconButton
          color="primary"
          size="small"
          aria-label="send message"
          onClick={handleSendMessage}
          disabled={!isTyping}
          style={{
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: isTyping ? 1 : 0.2, // Suaviza a opacidade
            transform: isTyping ? "scale(1)" : "scale(0.9)", // Adiciona uma leve redução
            pointerEvents: isTyping ? "auto" : "none", // Evita cliques quando desativado
          }}
          // disabled={stateChat && stateChat.loading_generate_llm}
        >
          <ArrowCircleRightRoundedIcon
            fontSize="large"
            style={
              stateChat && stateChat.loading_generate_llm
                ? { color: "#333", opacity: "50%" }
                : { color: "#333" }
            }
          />
        </IconButton>
      </div>
    </Paper>
  );
}
