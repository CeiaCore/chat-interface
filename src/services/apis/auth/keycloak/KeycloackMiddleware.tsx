import { useKeycloak } from "@react-keycloak/web";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Loading from "../../../../pages/loading/Loading";

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

interface KeycloackMiddlewareProps {
  children: ReactNode;
}

function KeycloackMiddleware({ children }: KeycloackMiddlewareProps) {
  const { keycloak, initialized } = useKeycloak();
  const [userInfo, setUserInfo] = useState("");

  const fetchUserInfo = useCallback(async () => {
    if (initialized && keycloak.authenticated) {
      const { name } = (await keycloak.loadUserInfo()) as TUserInfo;
      console.log();

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
        {children}
        <button style={{ cursor: "pointer" }} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default KeycloackMiddleware;
