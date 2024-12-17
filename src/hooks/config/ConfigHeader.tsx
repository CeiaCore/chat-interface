export const ConfigHeader = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${keycloak.token}`, Keycloak authorization
    },
  };

  return { config };
};
