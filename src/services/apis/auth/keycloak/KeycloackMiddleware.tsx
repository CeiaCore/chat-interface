import { useKeycloak } from "@react-keycloak/web";
import { ReactNode, useCallback, useContext, useEffect } from "react";
import Loading from "../../../../pages/loading/Loading";
import { ContextAuth, User } from "../../../../context/AuthContext";
import { LOAD_USER } from "../../../../context/types/types";

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
  const { dispatchAuth } = useContext(ContextAuth);
  const fetchUserInfo = useCallback(async () => {
    if (initialized && keycloak.authenticated) {
      const { preferred_username, sub, email } =
        (await keycloak.loadUserInfo()) as TUserInfo;

      const user: User = {
        user_id: sub,
        user_name: preferred_username,
        email: email,
      };
      dispatchAuth({ type: LOAD_USER, payload: user });
    }
  }, [initialized, keycloak]);

  useEffect(() => {
    fetchUserInfo();
  }, [initialized, keycloak, fetchUserInfo]);

  if (keycloak.authenticated) {
    return children;
  } else {
    return <Loading />;
  }
}

export default KeycloackMiddleware;
