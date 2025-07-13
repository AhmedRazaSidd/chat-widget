import { demoMessages } from "@/constaint";
import axios from "@/lib/axios";
import { ChatConfig, Message } from "@/types";
import { create } from "zustand";

// Define the message type (optional but good practice)

type ChatStore = {
  config: ChatConfig;
  setConfig: (config: ChatConfig) => void;
  messages: Message[];
  sendMessage: (message: Message) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  config: {
    botId: null,
    apiKey: null,
    ai: null,
    model: null,
  },
  setConfig: (config: ChatConfig) => {
    set({ config });
  },
  messages: [...demoMessages],

  sendMessage: async (message) => {
    const config = get().config;
    const response = await axios.post(`${config.ai}`, {
      config,
      message,
    });

    console.log(response);

    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
