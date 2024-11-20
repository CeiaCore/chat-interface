import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import KeycloackMiddleware from "./KeycloackMiddleware";

interface keycloakConfigProps {
  url: string;
  realm: string;
  clientId: string;
}

const keycloakConfig: keycloakConfigProps = {
  url: import.meta.env.VITE_KEY_CLOAK_URL || "",
  realm: import.meta.env.VITE_KEY_CLOAK_REALM || "",
  clientId: import.meta.env.VITE_KEY_CLOAK_CLIENT_ID || "",
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
