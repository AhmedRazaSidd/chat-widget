import { Moment } from "moment";

export interface Message {
  id: string; // Unique ID (uuid)
  role: "user" | "bot" | "agent" | "system";
  content: string;
  timestamp: Moment;
  type?: "text" | "image" | "file" | "video" | "button" | "card";
  status?: "sent" | "received" | "seen" | "error";
}

export interface ChatConfig {
  botId: string | null;
  apiKey: string | null;
  ai: string | null;
  model: string | null;
}
