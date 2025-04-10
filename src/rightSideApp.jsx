import React, { useState } from 'react';
import Navbar from './component/navbar';
import ChatComponent from './component/chatComponent';

const RightSideApp = () => {
  const [chatHistory, setChatHistory] = useState([]); // State to store the chat history

  return (
    <div className="h-[100%] w-[100%] bg-[#1B1C1D] float-end relative">
      {/* Conditionally render "Hello There" */}
      {chatHistory.length === 0 && (
        <div className="flex justify-center items-center h-[100vh] w-[100%] absolute">
          <h1 className="text-5xl bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
            Hello There
          </h1>
        </div>
      )}
      <Navbar />
      <ChatComponent chatHistory={chatHistory} setChatHistory={setChatHistory} />
    </div>
  );
};

export default RightSideApp;