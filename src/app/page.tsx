"use client";
import ChatBubble from "@/components/widget/ChatBubble";
import ChatWindow from "@/components/widget/ChatWindow";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object" || event.data === null) return;

      const { type, payload } = event.data;

      // console.log("📨 Message received:", event.data);

      switch (type) {
        case "expand-chatbot":
          setOpen(true);
          // console.log("🔼 Expand command received");
          break;

        case "collapse-chatbot":
          setOpen(false); // 👈 missing before!
          // console.log("🔽 Collapse command received");
          break;

        case "custom-command":
          // console.log("🛠 Custom command received:", payload);
          break;

        case "chatbot-loaded":
          // console.log("🤖 Bot loaded");
          break;

        case "user-message":
          // console.log("📩 User sent message:", payload?.message);
          break;

        default:
        // console.warn("⚠️ Unknown message type:", type);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="bg-black">
      {!open && <ChatBubble />}
      {open && <ChatWindow />}
    </div>
  );
}
