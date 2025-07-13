"use client";
import ChatBubble from "@/components/widget/ChatBubble";
import ChatWindow from "@/components/widget/ChatWindow";
import { useChatStore } from "@/hooks/useChatStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const { setConfig } = useChatStore();

  useEffect(() => {
    const handleFetchConfig = () => {
      const apiKey = searchParams.get("apiKey") || "";
      const botId = searchParams.get("botId") || "";
      const ai = searchParams.get("ai") || "";
      const model = searchParams.get("model") || "";

      setConfig({
        apiKey,
        botId,
        ai,
        model,
      });
    };

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
          handleFetchConfig();
          // config
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

  useEffect(() => {
    window.parent.postMessage(
      {
        type: "chatbot-loaded",
      },
      "*"
    );
  }, []);

  return (
    <>
      {!open && <ChatBubble />}
      {open && <ChatWindow />}
    </>
  );
}
