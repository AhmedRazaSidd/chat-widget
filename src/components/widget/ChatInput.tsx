import { useChatStore } from "@/hooks/useChatStore";
import { Send } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const ChatInput = () => {
  const { sendMessage } = useChatStore();
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    sendMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: moment(),
    });

    setInput(""); // Clear input after sending
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 m-3">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full h-full pl-5 p-4 text-sm border rounded-4xl border-gray-200"
        id="messageInput"
        name="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="text-black p-4 rounded-full flex items-center justify-center bg-purple-700 hover:bg-purple-600 transition"
        onClick={handleSend}
      >
        <Send size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
