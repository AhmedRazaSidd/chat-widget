import ChatInput from "./ChatInput";
import Header from "./Header";
import Messages from "./Messages";

interface ChatBubbleProps {
  onClose?: () => void;
}
const ChatWindow: React.FC<ChatBubbleProps> = ({ onClose }) => {
  return (
    <>
      <Header />
      <Messages />
      <ChatInput />
    </>
  );
};

export default ChatWindow;
