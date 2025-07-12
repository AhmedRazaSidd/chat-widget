import React from "react";

interface ChatBubbleProps {
  onClick?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <img src="/chatbot.jpg" className="w-[100px] h-[100px] object-cover" />
    </div>
  );
};

export default ChatBubble;
