import { ReactNode, createContext, useReducer, Dispatch } from "react";

// Action Types
import {
  LOAD_CHAT,
  //   LOAD_CHATS,
  ADD_MESSAGE,
  LOADING_GENERATE_LLM_TRUE,
  LOADING_GENERATE_LLM_FALSE,
  LOADING_TRUE,
  LOADING_FALSE,
  ADD_MESSAGE_BOT,
  DEACTIVE_SCROLL,
  ACTIVE_SCROLL,
  UPDATE_CONTEXT,
  ADD_METADATA_MESSAGE_BOT,
  LOAD_NOTIFICATION,
  LOAD_CHATS,
  LOADING_DRAWER_TRUE,
  LOADING_DRAWER_FALSE,
} from "./types/types";

// Interfaces
export interface Message {
  rule?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface ChatInfo {
  chat_id: string;
  create_at: unknown;
  chat_label: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  history_context?: Record<string, unknown>[];
}

export interface StateChat {
  chats_all_info: ChatInfo[];
  chat: Chat | null;
  messages: Message[];
  loading_generate_llm: boolean;
  loading_drawer: boolean;
  loading: boolean;
  message_test: string;
  is_active_scroll: boolean;
  history: Record<string, unknown>[];
  load_notification: Record<string, unknown>[];
}

export interface ActionChat {
  type: string;
  payload?: unknown;
}

// Context
interface ContextChatProps {
  stateChat: StateChat;
  dispatchChat: Dispatch<ActionChat>;
}

export const ContextChat = createContext<ContextChatProps | undefined>(
  undefined
);

// Initial State
const initialState: StateChat = {
  chats_all_info: [],
  chat: null,
  messages: [],
  history: [],
  loading_generate_llm: false,
  loading_drawer: false,
  loading: false,
  message_test: "",
  is_active_scroll: true,
  load_notification: [],
};

// Reducer
function reducer(stateChat: StateChat, actionChat: ActionChat): StateChat {
  switch (actionChat.type) {
    case LOAD_CHAT:
      if (actionChat.payload && typeof actionChat.payload === "object") {
        const data = actionChat.payload as Chat;
        return data
          ? {
              ...stateChat,
              chat: data,
              messages: data.messages,
              history: data.history_context || [],
            }
          : stateChat;
      }
      return stateChat;

    case LOAD_CHATS:
      if (actionChat.payload && Array.isArray(actionChat.payload)) {
        const chats = actionChat.payload as ChatInfo[];

        return { ...stateChat, chats_all_info: chats };
      }
      return stateChat;

    case ADD_MESSAGE:
      return {
        ...stateChat,
        messages: [...stateChat.messages, actionChat.payload as Message],
      };

    case ADD_MESSAGE_BOT: {
      const lastMessageIndex = stateChat.messages.length - 1;
      if (stateChat.messages[lastMessageIndex]?.rule) {
        stateChat.messages[lastMessageIndex].message =
          actionChat.payload as string;
      }
      return { ...stateChat, message_test: actionChat.payload as string };
    }

    case ADD_METADATA_MESSAGE_BOT: {
      const lastMessageIndex = stateChat.messages.length - 1;
      if (stateChat.messages[lastMessageIndex]?.rule) {
        stateChat.messages[lastMessageIndex].metadata =
          actionChat.payload as Record<string, unknown>;
      }
      return stateChat;
    }

    case LOADING_GENERATE_LLM_TRUE:
      return { ...stateChat, loading_generate_llm: true };

    case LOADING_GENERATE_LLM_FALSE:
      return { ...stateChat, loading_generate_llm: false };

    case LOADING_DRAWER_TRUE:
      return { ...stateChat, loading_drawer: true };

    case LOADING_DRAWER_FALSE:
      return { ...stateChat, loading_drawer: false };

    case LOADING_TRUE:
      return { ...stateChat, loading: true };

    case LOADING_FALSE:
      return { ...stateChat, loading: false };

    case ACTIVE_SCROLL:
      return { ...stateChat, is_active_scroll: true };

    case DEACTIVE_SCROLL:
      return { ...stateChat, is_active_scroll: false };

    case LOAD_NOTIFICATION:
      return {
        ...stateChat,
        load_notification: actionChat.payload as Record<string, unknown>[],
      };

    case UPDATE_CONTEXT:
      return {
        ...stateChat,
        history: actionChat.payload as Record<string, unknown>[],
      };

    default:
      return stateChat;
  }
}

// Provider
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [stateChat, dispatchChat] = useReducer(reducer, initialState);

  return (
    <ContextChat.Provider value={{ stateChat, dispatchChat }}>
      {children}
    </ContextChat.Provider>
  );
};
