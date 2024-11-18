import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

const Auth: React.FC = () => {
  const { keycloak } = useKeycloak();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDirectLogin = async () => {
    const data = new URLSearchParams();
    data.append("client_id", "react-app-1");
    data.append("username", email);
    data.append("password", password);
    data.append("grant_type", "password");

    try {
      const response = await fetch(
        "http://localhost:8080/auth/realms/teste/protocol/openid-connect/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        }
      );

      if (response.ok) {
        const tokenData = await response.json();
        console.log("Access Token:", tokenData.access_token);
        keycloak.token = tokenData.access_token; // Armazena o token no Keycloak
        keycloak.onAuthSuccess(); // Indica autenticação bem-sucedida
      } else {
        const errorData = await response.json();
        setErrorMessage(
          "Login falhou: " +
            (errorData.error_description || response.statusText)
        );
      }
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleDirectLogin}
          sx={{ mt: 2 }}
        >
          Login with Email
        </Button>
        {errorMessage && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Auth;
