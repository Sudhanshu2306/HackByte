import React from 'react';
import ChatbotIcon from './ChatbotIcon';

function ChatMessage({ chat }) {
  return (
    <div className={`flex items-start ${chat.role === "model" ? "justify-start" : "justify-end"}`}>
      {chat.role === "model" && <ChatbotIcon className="w-8 h-8 mr-2" />}
      <p className={` mt-1 p-2 rounded-lg text-white ${chat.role === "model" ? "bg-[#416c04]" : "bg-gray-600"}`}>
        {chat.text}
      </p>
    </div>
  );
}

export default ChatMessage;
