import ChatInput from "./ChatInput";
import Header from "./Header";
import Messages from "./Messages";

interface ChatBubbleProps {
  onClose?: () => void;
}
const ChatWindow: React.FC<ChatBubbleProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <Messages />
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
