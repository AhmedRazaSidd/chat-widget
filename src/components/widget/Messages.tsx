import { demoMessages } from "@/constaint";
import { useChatStore } from "@/hooks/useChatStore";
import { Message } from "@/types";
import moment from "moment";
import React, { useEffect, useRef } from "react";

const Messages = () => {
  const { messages } = useChatStore();
  const messageScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-auto py-3 h-[calc(100vh-100px)] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`
        max-w-[80%] p-3 my-1.5 rounded-lg text-sm
        transition-all duration-200 ease-in-out
        mx-2
        ${
          message.role === "user"
            ? "bg-gray-100 text-black rounded-br-none"
            : "bg-purple-600 text-gray-800 dark:text-gray-200 rounded-bl-none"
        }
        
        animate-in fade-in slide-in-from-bottom-2
      `}
          >
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
            <div
              className={`text-xs mt-1 opacity-70 ${
                message.role === "user" ? "text-black" : "text-white "
              }`}
            >
              {moment(message.timestamp || new Date()).fromNow()}
            </div>
          </div>
        </div>
      ))}
      <div ref={messageScrollRef}></div>
    </div>
  );
};

export default Messages;
