import React, { useRef } from 'react';

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory(history => [...history, { role: "user", text: userMessage }]);
    setTimeout(() => {
      setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 600);
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex gap-2">
      <input ref={inputRef} type="text" placeholder="Message..." className="flex-1 p-2 border rounded-md" required />
      <button className="p-2 bg-[#416c04] text-white rounded-md"><span className='bx bx-chevron-up'></span></button>
    </form>
  );
}

export default ChatForm;