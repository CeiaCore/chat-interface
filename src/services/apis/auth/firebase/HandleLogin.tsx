import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";

interface handleLoginProps {
  email: string;
  password: string;
}
export const useHandleLoginFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: handleLoginProps) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return { handleLogin, loading, message };
};
