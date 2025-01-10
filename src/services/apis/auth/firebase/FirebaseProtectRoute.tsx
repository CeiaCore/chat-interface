import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../services/apis/auth/firebase/firebase.js";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const FirebaseProtectRoute = ({ children }: props) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return "carregando...";
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default FirebaseProtectRoute;
