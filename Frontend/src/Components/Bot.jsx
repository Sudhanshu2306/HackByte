import { useEffect, useState, useRef } from 'react';
import ChatbotIcon from './ChatbotIcon.jsx';
import ChatForm from './ChatForm.jsx';
import ChatMessage from './ChatMessage.jsx';

function Bot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const updateHistory = (text) => {
    setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
  };

  const generateBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-white rounded-full flex flex-col items-end">
      {!showChatbot && (
      <button 
        onClick={() => setShowChatbot(true)} 
        className="p-4 rounded-full bg-[#416c04] text-white shadow-lg focus:outline-none">
        <span className='bx bxs-chat rounded-full'></span>
      </button>
    )}

      {/* Chatbot Popup - Visible when showChatbot is true */}
      {showChatbot && (
        <div className="w-[400px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden mt-2">
          <div className="flex items-center justify-between bg-[#416c04] p-3 text-white">
            <div className="flex items-center gap-2">
              <ChatbotIcon className=' text-black' />
              <h2 className="text-lg font-semibold">Chatbot</h2>
            </div>
            <button 
              onClick={() => setShowChatbot(false)} 
              className="text-white p-2">
              <span className='bx bx-x px-4 size-6'></span>
            </button>
          </div>
          <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-3">
            <ChatMessage chat={{ role: "model", text: "Hey there 👋\nHow can I help you today?" }} />
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          <div className="p-3 bg-gray-100">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Bot;
