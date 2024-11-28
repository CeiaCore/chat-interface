import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import KeycloackMiddleware from "./KeycloackMiddleware";

interface keycloakConfigProps {
  url: string;
  realm: string;
  clientId: string;
}

const keycloakConfig: keycloakConfigProps = {
  url: window._env_.KEY_CLOAK_URL || "",
  realm: window._env_.KEY_CLOAK_REALM || "",
  clientId: window._env_.KEY_CLOAK_CLIENT_ID || "",
};

const initOptions = { onLoad: "login-required", checkLoginIframe: false };

interface KeycloakPros {
  children: React.ReactNode;
}
const KeycloakComponent = ({ children }: KeycloakPros) => {
  return (
    <ReactKeycloakProvider
      authClient={new Keycloak(keycloakConfig)}
      initOptions={initOptions}
    >
      <KeycloackMiddleware>{children}</KeycloackMiddleware>
    </ReactKeycloakProvider>
  );
};

export default KeycloakComponent;
