import { useKeycloak } from "@react-keycloak/web";
import { useCallback, useEffect, useState } from "react";

// Retorno UserInfo
type TUserInfo = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  sub: string;
};

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [userInfo, setUserInfo] = useState("");

  // Enquanto não inicia a sessão, deve mostrar loading...

  // Busca informações do usuário e grava no estado userInfo
  const fetchUserInfo = useCallback(async () => {
    if (initialized && keycloak.authenticated) {
      const { name } = (await keycloak.loadUserInfo()) as TUserInfo;

      setUserInfo(name);
    }
  }, [initialized, keycloak]);

  useEffect(() => {
    fetchUserInfo();
  }, [initialized, keycloak, fetchUserInfo]);

  // Desloga o usuário
  const handleLogout = () => {
    try {
      keycloak.logout();
    } catch (e) {
      console.log(e);
    }
  };

  // Senão estiver logado, redireciona para fazer login
  if (keycloak.authenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Seja bem-vindo {userInfo}</h1>
        <button style={{ cursor: "pointer" }} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  } else {
    return <div>Redirectidas sad adsng t asddaso login...</div>;
  }
}

export default App;
