import { Moment } from "moment";

export interface Message {
  id?: string; // Unique message ID
  role: "user" | "bot" | "assistant" | "agent" | "system"; // Message sender role
  content: string; // Message content (text or description)
  timestamp?: Moment; // JavaScript Date object (easier to serialize/store)
  type?: "text" | "image" | "file" | "video" | "button" | "card"; // Optional message type
  status?: "sent" | "received" | "seen" | "error"; // Optional delivery status
}

export interface ChatConfig {
  botId: string | null;
  apiKey: string | null;
  ai: string | null;
  model: string | null;
}
