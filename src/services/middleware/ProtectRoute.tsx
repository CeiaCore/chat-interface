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

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
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

  //   // Desloga o usuário
  //   const handleLogout = () => {
  //     try {
  //       keycloak.logout();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  if (keycloak.authenticated) {
    return { children };
  } else {
    return <div>Redirect login...</div>;
  }
}

export default PrivateRoute;
