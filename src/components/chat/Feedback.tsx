import { Tooltip } from "@mui/material";
import styles from "./Feedback.module.css";
import { CgRedo } from "react-icons/cg";
import { useContext, useState } from "react";
import { ContextChat } from "../../context/ChatContext";
import { TbCopy } from "react-icons/tb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaCheck } from "react-icons/fa6";
interface FeedbackProps {
  handleClickOpen: () => void;
  setIndexFeedback: (index: any) => void;
  indexFeedback: [number];
  index: number;
  message: string;
  hoveredIndex: number;
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
const Feedback = ({
  handleClickOpen,
  message,
  hoveredIndex,
  setIndexFeedback,
  indexFeedback,
  index,
}: FeedbackProps) => {
  const { stateChat } = useContext(ContextChat) || {};
  const [copied, setCopied] = useState(false);
  const [feedbackPositive, setFeedbackPositive] = useState(false);
  const [feedbackNegative, setFeedbackNegative] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
    });

    setInterval(() => setCopied(false), 2500);
  };

  return (
    <>
      {stateChat &&
        !stateChat?.loading_generate_llm &&
        hoveredIndex === index && (
          <div className={styles.icons}>
            <ThemeProvider theme={theme}>
              <Tooltip
                title="Copiar conteúdo"
                arrow
                placement="bottom"
                sx={{
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "red", // Altere para a cor desejada
                    color: "white", // Cor do texto
                    fontSize: "14px", // Tamanho da fonte
                  },
                  "& .MuiTooltip-arrow": {
                    color: "blue", // Cor da seta
                  },
                }}
              >
                <span
                  onClick={() => {
                    copyToClipboard();
                  }}
                >
                  {copied ? (
                    <FaCheck
                      style={{
                        fontSize: 15,
                      }}
                    />
                  ) : (
                    <TbCopy
                      style={{
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  )}
                </span>
              </Tooltip>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Tooltip
                onClick={() => {
                  setFeedbackPositive(!feedbackPositive);
                }}
                title="Resposta satisfatória"
                arrow
                placement="bottom"
              >
                {feedbackPositive ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon-md-heavy"
                  >
                    <path
                      d="M12.592 2.50386C12.8047 2.13014 13.2317 1.935 13.652 2.01942C15.5627 2.40314 16.7246 4.36079 16.1516 6.23085L15.303 9L17.0142 9C19.6409 9 21.5485 11.5079 20.8574 14.0525L19.4994 19.0525C19.0267 20.7927 17.4526 22 15.6562 22H9.96721C8.869 21.9979 7.97939 21.1033 7.97939 20V9H8.31734C8.67472 9 9.0047 8.80771 9.18201 8.49613L12.592 2.50386Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M5.98763 9C4.33761 9 3 10.3431 3 12V19C3 20.6569 4.33761 22 5.98763 22H6.52055C6.18162 21.4116 5.98763 20.7286 5.98763 20V9Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-md-heavy"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                )}
              </Tooltip>
            </ThemeProvider>
            {feedbackPositive ? (
              ""
            ) : (
              <ThemeProvider theme={theme}>
                <Tooltip
                  title="Resposta Insatisfatória"
                  arrow
                  placement="bottom"
                >
                  <span
                    onClick={() => {
                      handleClickOpen();
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-md-heavy"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </Tooltip>
              </ThemeProvider>
            )}
            <ThemeProvider theme={theme}>
              <Tooltip title="Gerar nova resposta" arrow placement="bottom">
                <span>
                  <CgRedo
                    style={{
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  />
                </span>
              </Tooltip>
            </ThemeProvider>
          </div>
        )}
    </>
  );
};

export default Feedback;
