import { useState } from "react";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const useHandleLogoutFirebase = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      signOut(auth)
        .then(() => {
          navigate("/login");

          // Você pode redirecionar o usuário ou fazer qualquer outra ação necessária aqui
        })
        .catch((error) => {
          console.error("Error signing out: ", error);
        });
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return { handleLogout, message };
};
