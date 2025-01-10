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
import { FaRegLightbulb } from "react-icons/fa";

interface InputStandByProps {
  setState: React.Dispatch<boolean>;
}

export default function InputStandBy({ setState }: InputStandByProps) {
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
        backgroundColor: "#f4f4f4",
        // backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "rgba(255, 255, 255, 0.92) 0px 0px 30px 20px", // Sombra suave e fraca
        // border: "1px solid  #b9b9b9",
        transition: ".2s",
      }}
    >
      <div>
        <TextareaAutosize
          placeholder={`Envie uma mensagem para  ${"BOT_NAME"}`}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          disabled={true}
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
          <IconButton
            component="label"
            color="primary"
            size="small"
            style={{ color: "#333" }}
          >
            <AttachFileRoundedIcon />
            <input type="file" multiple hidden />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            aria-label="send message"
            style={{
              color: "#333",
            }}
          >
            <FaRegLightbulb />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            aria-label="send message"
            style={{
              color: "#333",
            }}
          >
            <TbWorldSearch />
          </IconButton>
        </div>
        <IconButton
          color="primary"
          size="small"
          aria-label="send message"
          disabled={true}
          style={{
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          // disabled={stateChat && stateChat.loading_generate_llm}
        >
          <ArrowCircleRightRoundedIcon
            fontSize="large"
            style={{ opacity: "50%" }}
          />
        </IconButton>
      </div>
    </Paper>
  );
}
