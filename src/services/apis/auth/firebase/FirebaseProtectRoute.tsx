import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../services/apis/auth/firebase/firebase.js";
import { ReactNode, useContext, useEffect } from "react";
import { ContextAuth } from "../../../../context/AuthContext.js";
import { LOAD_USER } from "../../../../context/types/types.js";
import Loading from "../../../../pages/loading/Loading.js";

interface props {
  children: ReactNode;
}

const FirebaseProtectRoute = ({ children }: props) => {
  const [user, loading, error] = useAuthState(auth);
  const { dispatchAuth } = useContext(ContextAuth) || {};

  useEffect(() => {
    if (user && dispatchAuth) {
      const user_info = {
        email: user.email,
        user_id: user.uid,
      };
      dispatchAuth({ type: LOAD_USER, payload: user_info });
    }
  }, [user, dispatchAuth]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default FirebaseProtectRoute;
