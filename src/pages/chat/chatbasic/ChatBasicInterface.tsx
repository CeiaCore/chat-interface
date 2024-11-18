import styles from "./ChatBasicInterface.module.css";

import Logo from "../../../assets/logos/logodrawer.png";
import ReactMarkdown from "react-markdown";
import Feedback from "../../../components/chat/Feedback";
import Input from "../../../components/chat/Input";
import FormDialog from "../../../components/chat/Dislike";
import React, { useContext } from "react";
import { ContextChat } from "../../../context/ChatContext";
const ChatBasicInterface = () => {
  const { stateChat } = useContext(ContextChat) || {};

  const messages = [
    {
      rule: "user",
      message: "Qual a estrutura de dados usado para mensagens no chatgpt?",
    },
    {
      rule: "bot",
      message: `
Você levantou um ponto interessante! A estrutura que descrevi é mais uma lista sequencial de mensagens, que é o formato usado mais comumente para gerenciar o histórico de conversas em uma sessão linear (como um bate-papo contínuo). No entanto, a ideia de uma **estrutura em árvore** também é relevante, especialmente em situações onde há ramificações de contexto ou quando múltiplos caminhos de resposta precisam ser considerados. 

### Estrutura Linear vs. Estrutura em Árvore

1. **Estrutura Linear (Lista Sequencial)**:
   - Usada em muitos sistemas de chat, como o ChatGPT, quando o contexto é seguido de forma linear, sem desvios ou ramificações.
   - Cada mensagem é processada na sequência em que foi enviada, e o contexto é acumulado em ordem cronológica.
   - Isso simplifica o gerenciamento de contexto, pois o modelo vê toda a sequência de mensagens de forma linear.

2. **Estrutura em Árvore**:
   - Pode ser útil em contextos onde o modelo precisa considerar múltiplas ramificações ou cenários de respostas, como em diálogos complexos ou jogos de narrativa interativa.
   - Em uma árvore, cada mensagem (ou nó) poderia gerar múltiplas respostas possíveis, criando uma ramificação de contexto que permite explorar diferentes caminhos de conversa.
   - Essa abordagem permite revisitar "nós" anteriores e escolher diferentes ramos de interação, o que é útil para simular diálogos não-lineares.

### Quando a Árvore é Mais Adequada

Uma estrutura em árvore é mais adequada em cenários como:
- **Simulações de Diálogo Não-Linear**: Por exemplo, em sistemas de IA para jogos, onde o jogador pode fazer escolhas e cada escolha leva a um caminho diferente na conversa.
- **Aplicações de Suporte ao Cliente**: Onde uma pergunta inicial pode levar a diferentes fluxos de resposta com base nas escolhas do usuário.
- **Exploração de Cenários ou “What-Ifs”**: Em situações em que é útil ver como diferentes perguntas ou respostas influenciam o diálogo.

### Por que o ChatGPT usa a Estrutura Linear?

No caso do ChatGPT, a estrutura linear é usada principalmente porque o modelo é projetado para seguir uma sequência direta de mensagens, acumulando contexto sem precisar ramificar em várias direções. Essa abordagem é eficiente para conversas de fluxo contínuo, onde o histórico é sequencial e não há a necessidade de "voltar atrás" ou explorar caminhos alternativos dentro de uma mesma conversa.

### Possibilidade de Estrutura Híbrida

Em sistemas mais avançados, uma **estrutura híbrida** pode ser usada, onde o histórico é linear, mas permite a criação de sub-conversas em árvore para explorar respostas alternativas ou diferentes cenários.
        `,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [indexFeedback, setIndexFeedback]: any = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [feedback, setFeedback]: any = React.useState("");

  const user_id = 1;
  const chat_id = 1;
  return (
    <>
      <FormDialog
        handleClose={handleClose}
        open={open}
        // metadata={metadata}
        user_id={user_id}
        chat_id={chat_id}
        setFeedback={setFeedback}
        indexFeedback={indexFeedback}
      />

      <div className={styles.container}>
        {messages?.length !== 0 ? (
          <>
            {messages?.map((element: any, index: any) => (
              <>
                {element.rule === "user" ? (
                  <div className={`${styles.message_user} ${styles.user}`}>
                    {element.message}
                  </div>
                ) : (
                  <div className={`${styles.message} ${styles.bot}`}>
                    <img
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "-35px",
                        width: "30px",
                      }}
                      src={Logo}
                      alt="Logo"
                    />
                    {element.message && element.message.length > 0 ? (
                      <ReactMarkdown
                        components={{
                          li: ({ ...props }) => (
                            <li
                              style={{
                                listStyleType: "none",
                                position: "relative",
                                paddingLeft: "1.5em",
                                marginBottom: "0.5em",
                              }}
                              {...props}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  top: "0.85em",
                                  width: "0.4em",
                                  height: "0.4em",
                                  backgroundColor: "#333",
                                  borderRadius: "50%",
                                  content: '""',
                                  display: "inline-block",
                                }}
                              />
                              {props.children}
                            </li>
                          ),
                        }}
                      >
                        {element.message}
                      </ReactMarkdown>
                    ) : (
                      <div
                        style={{
                          height: "12px",
                          width: "12px",
                          borderRadius: "7px",
                          backgroundColor: "#333",
                        }}
                        className={styles.cursor}
                      ></div>
                    )}
                    <Feedback
                      handleClickOpen={handleClickOpen}
                      setIndexFeedback={setIndexFeedback}
                      indexFeedback={indexFeedback}
                      index={index}
                    />
                  </div>
                )}
              </>
            ))}
          </>
        ) : (
          "teste"
        )}

        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <Input />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBasicInterface;
