import React, { useEffect, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import main from './api-config/apiConfig';

const ChatComponent = ({ chatHistory, setChatHistory }) => {
  const [text, setText] = useState(''); // State to store the input value
  const [loading, setLoading] = useState(false); // State to track loading
  const chatViewRef = useRef(null);

  useEffect(() => {
    if (chatViewRef.current) {
      chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight;
    }
  }, [chatHistory])

  // Handle input change
  const handleInputChange = (e) => {
    setText(e.target.value); // Update the state
  };

  // Handle sending the input text and updating the response
  const handleSend = async () => {
    if (!text.trim()) return; // Prevent sending empty messages
    try {
      setLoading(true); // Set loading to true
      console.log("Sending text:", text); // Debugging log
      const result = await main(text); // Call the main function with the input text
      console.log("Response from API:", result); // Debugging log
  
      // Extract the response text from the API response
      const responseText = result.candidates[0]?.content?.parts[0]?.text || "No response from API";
  
      const newChat = {
        user: text, // User's input
        response: responseText, // AI's response
      };
      setChatHistory((prev) => [...prev, newChat]); // Add the new chat to the history
      setText(''); // Clear the input field
    } catch (error) {
      console.error("Error:", error.message);
      const errorChat = {
        user: text,
        response: "An error occurred while fetching the response.",
      };
      setChatHistory((prev) => [...prev, errorChat]); // Add the error message to the history
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="chatParent relative h-[89.5%] w-[100%] m-0 p-0 flex justify-center items-center">
      <div className="chat h-[100%] w-[55%] flex justify-center items-center relative">
        <div className="ChatBox absolute bottom-10 h-[110px] w-full border-[1px] border-solid bg-[#1B1C1D] border-[#6d6d6d] rounded-3xl">
          <input
            type="text"
            name="promptArea"
            placeholder="Ask Gemini"
            className="top h-1/2 pl-4 rounded-tl-3xl rounded-tr-3xl border-none focus:outline-none w-full flex items-center text-[17px] text-white font-medium"
            value={text} // Bind the input value to the state
            onChange={handleInputChange} // Update the state on input change
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend(); // Call handleSend on Enter key press
              }
            }}
          />
          <div className="bottom h-1/2 flex items-center">
            <div className="bg-[#262627] ml-3 w-10 h-10 flex items-center justify-center rounded-4xl">
              <AddIcon className="text-[#747576] cursor-pointer" sx={{ fontSize: 30 }} />
            </div>
            <div className="bg-[#262627] ml-3 w-34 h-10 flex items-center justify-center cursor-pointer rounded-4xl group transition-colors duration-300">
              <TravelExploreIcon className="text-[#747576] cursor-pointer group-hover:text-white" />
              <p className="text-[#747576] ml-1 group-hover:text-white">Deep Search</p>
            </div>
            <div
              className="end flex justify-center bg-[#323436] items-center rounded-4xl h-10 w-10 right-2 absolute"
              onClick={handleSend} // Call handleSend on click
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend(); // Call handleSend on Enter key press
                }
              }}
              tabIndex={0} // Make the div focusable for keydown events
            >
              <SendIcon className="text-white p-1 cursor-pointer" id="sendIcon" />
            </div>
          </div>
        </div>
        <div ref={chatViewRef} className="chatView h-[100%] w-[100%] flex flex-col gap-4 overflow-y-auto">
          {/* Render Chat History */}
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* User Input */}
              <div className="User self-end text-end text-wrap w-[90%] text-white p-2 rounded-lg">
                {chat.user}
              </div>
              {/* AI Response */}
              <div className="Response self-start text-wrap w-[90%] text-white p-2 rounded-lg">
                {loading && index === chatHistory.length - 1 ? (
                  <div
                    className="relative animate-spin h-8 w-8 border-4 border-solid border-transparent border-t-white rounded-full"
                  >
                    <img src="/gemini_logo.svg" alt="Gemini Logo" className="absolute inset-0 h-full w-full" />
                  </div>
                ) : (
                  <span><img src="/gemini_logo.svg" alt="Gemini Logo" className="inline-flex mr-2" />{chat.response}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;