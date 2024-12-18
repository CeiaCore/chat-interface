import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import {
  ADD_MESSAGE,
  LOADING_GENERATE_LLM_TRUE,
  SET_NEW_CHAT_TRUE,
} from "../../context/types/types";
import { ContextChat } from "../../context/ChatContext";
import { TbWorldSearch } from "react-icons/tb";
import { Tooltip } from "@mui/material";
import { FaRegLightbulb } from "react-icons/fa";

interface InputStandByProps {
  setState: React.Dispatch<boolean>;
}

export default function InputStandByAdvanced({ setState }: InputStandByProps) {
  const [message, setMessage] = React.useState("");
  const { dispatchChat } = React.useContext(ContextChat) || {};

  if (!dispatchChat) {
    return;
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const user_message = { rule: "user", message: message };
      dispatchChat({ type: ADD_MESSAGE, payload: user_message });
      dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });
      const bot_message = { rule: "bot", message: "", metadata: "" };
      dispatchChat({ type: ADD_MESSAGE, payload: bot_message });
      setState(false);
      dispatchChat({ type: SET_NEW_CHAT_TRUE });
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Evita a quebra de linha
      setState(false);
      handleSendMessage();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        padding: "10px 7px 7px 7px",
        boxShadow: "none",
        backgroundColor: "#f5f5f5",
        borderRadius: "20px",
      }}
    >
      <div>
        <TextareaAutosize
          placeholder={`Envie uma mensagem`}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: "none",
            resize: "none",
            outline: "none",
            fontWeight: 400,
            width: "95%",
            fontSize: ".9rem",
            backgroundColor: "#f5f5f5",
            lineHeight: "1.5",
            marginLeft: "10px",
            fontFamily: "Inter",
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
          <Tooltip title="Anexar arquivos" arrow placement="left">
            <IconButton
              color="primary"
              size="small"
              aria-label="send message"
              onClick={handleSendMessage}
            >
              <AttachFileRoundedIcon style={{ color: "#333" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refletir" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              aria-label="send message"
              onClick={handleSendMessage}
            >
              <FaRegLightbulb style={{ color: "#333" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Buscar na web" arrow placement="right">
            <IconButton
              color="primary"
              size="small"
              aria-label="send message"
              onClick={handleSendMessage}
            >
              <TbWorldSearch style={{ color: "#333" }} />
            </IconButton>
          </Tooltip>
        </div>
        <IconButton
          color="primary"
          size="small"
          aria-label="send message"
          onClick={handleSendMessage}
          // disabled={stateChat && stateChat.loading_generate_llm}
        >
          <ArrowCircleRightRoundedIcon
            fontSize="large"
            style={{ color: "#333" }}
          />
        </IconButton>
      </div>
    </Paper>
  );
}
