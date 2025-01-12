import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import logo from "../../../assets/logolarge.png";
import styles from "./LoginA.module.css";
import { GooSpinner } from "react-spinners-kit";
// import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  border: "none",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "360px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

interface handleLoginInterface {
  (email: string, password: string): Promise<void>;
}

interface LoginAProps {
  handleLogin: handleLoginInterface;
  message: string;
  isLoading: boolean;
}

export default function LoginA({
  handleLogin,
  isLoading,
  message,
}: LoginAProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);

    handleLogin({ email: data.get("email"), password: data.get("password") });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Por favor insira um email válido");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("A senha precisa ter pelo menos 6 caracteres");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img
            style={{
              width: "150px",
              alignSelf: "center",
              marginBottom: "50px",
            }}
            src={logo}
          />
          <Typography
            component="h1"
            variant="h4"
            mt={2}
            sx={{
              width: "80%",
              alignSelf: "center",
              fontSize: "clamp(1.9rem, 10vw, 2.2rem)",
              backgroundColor: "transparent",
              textAlign: "center",
              fontFamily: "Inter",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Que bom que você voltou
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px", // Altura do campo

                    "& fieldset": {
                      borderRadius: "5px",
                      borderColor: "rgb(138, 138, 138)", // Cor da borda padrão
                    },
                    "&:hover fieldset": {
                      borderColor: "rgb(92, 92, 92)", // Cor da borda padrão
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(78, 78, 78)", // Cor da borda ao focar
                    },
                  },
                }}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px", // Altura do campo

                    "& fieldset": {
                      borderColor: "rgb(138, 138, 138)", // Cor da borda padrão
                    },
                    "&:hover fieldset": {
                      borderColor: "rgb(92, 92, 92)", // Cor da borda padrão
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(78, 78, 78)", // Cor da borda ao focar
                    },
                  },
                }}
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            {message && message}
            <button onClick={validateInputs} className={styles.button}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <GooSpinner size={27} color="#fff" />
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
