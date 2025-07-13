import { demoMessages } from "@/constaint";
import axios from "@/lib/axios";
import { ChatConfig, Message } from "@/types";
import { create } from "zustand";

// Define the message type (optional but good practice)

type ChatStore = {
  messages: Message[];
  sendMessage: (message: Message) => void;
  config: ChatConfig;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  config: {
    botId: null,
    apiKey: null,
    ai: null,
    model: null,
  },
  messages: [...demoMessages],

  sendMessage: async (message) => {
    // const response = axios.post(message)

    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
