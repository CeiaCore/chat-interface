import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import useInteract from "../../hooks/chat/useInteraction";
import { ContextChat } from "../../context/ChatContext";
import {
  ACTIVE_SCROLL,
  ADD_MESSAGE,
  LOADING_GENERATE_LLM_TRUE,
} from "../../context/types/types";
import { FaRegLightbulb } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { TbWorldSearch } from "react-icons/tb";

interface InputProps {
  chat_id: string;
  BOT_NAME: string;
}

export default function InputAdvanced({ chat_id, BOT_NAME }: InputProps) {
  const [message, setMessage] = React.useState("");
  const { interactChat } = useInteract();

  const { stateChat, dispatchChat } =
    React.useContext(ContextChat) || undefined;

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    dispatchChat({ type: ACTIVE_SCROLL });
    if (message.trim() !== "") {
      const user_message = { rule: "user", message: message };
      dispatchChat({ type: ADD_MESSAGE, payload: user_message });
      dispatchChat({ type: LOADING_GENERATE_LLM_TRUE });

      const bot_message = { rule: "bot", message: "", metadata: "" };
      dispatchChat({ type: ADD_MESSAGE, payload: bot_message });

      interactChat({
        chat_id: chat_id,
        query: message,
      });
    }

    setMessage("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
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
              disabled={stateChat && stateChat.loading_generate_llm}
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
              disabled={stateChat && stateChat.loading_generate_llm}
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
              disabled={stateChat && stateChat.loading_generate_llm}
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
