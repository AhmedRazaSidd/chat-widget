import React from "react";

interface ChatBubbleProps {
  onClick?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="overflow-hidden  fixed bottom-2 right-2">
      <img src="/chatbot.jpg" className="w-[100px] h-[100px] rounded-full  object-cover" />
    </div>
  );
};

export default ChatBubble;
