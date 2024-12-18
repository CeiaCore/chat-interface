import { ReactNode, createContext, useReducer, Dispatch } from "react";

// Action Types
import { LOAD_USER } from "./types/types";

export interface User {
  user_id: string;
  email: string;
  user_name: string;
}

export interface StateAuth {
  user: User;
}

export interface ActionAuth {
  type: string;
  payload?: unknown;
}

// Context
interface ContextAuthProps {
  stateAuth: StateAuth;
  dispatchAuth: Dispatch<ActionAuth>;
}

export const ContextAuth = createContext<ContextAuthProps | undefined>(
  undefined
);

// Initial State
const initialState: StateAuth = {
  user: {
    email: "teste@teste.com",
    user_name: "teste",
    user_id: "12345",
  },
};

// Reducer
function reducer(stateAuth: StateAuth, actionAuth: ActionAuth): StateAuth {
  switch (actionAuth.type) {
    case LOAD_USER:
      if (actionAuth.payload && typeof actionAuth.payload === "object") {
        const data = actionAuth.payload as User;
        return data
          ? {
              ...stateAuth,
              user: data,
            }
          : stateAuth;
      }
      return stateAuth;

    default:
      return stateAuth;
  }
}

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [stateAuth, dispatchAuth] = useReducer(reducer, initialState);

  return (
    <ContextAuth.Provider value={{ stateAuth, dispatchAuth }}>
      {children}
    </ContextAuth.Provider>
  );
};
