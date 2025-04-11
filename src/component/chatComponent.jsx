import React, { useEffect, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import main from './api-config/apiConfig';
import ReactMarkdown from 'react-markdown'

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

    const newChat = {
      user: text, // User's input
      response: [], // Placeholder for the response
      loading: true, // Set loading to true for this chat
    };

    setChatHistory((prev) => [...prev, newChat]); // Add the new chat to the history
    setText(''); // Clear the input field

    try {
      const result = await main(text); // Call the main function with the input text
      console.log("Response from API:", result); // Debugging log

      const responseText = result.candidates[0]?.content?.parts[0]?.text || "No response from API";

      // Process the response into a structured format
      const structuredResponse = responseText.split("\n\n").map((section) => {
        const lines = section.trim().split("\n");
        const header = lines[0].trim(); // First line is the header
        const content = lines.slice(1).map((line) => {
          // Add a dot and indentation for child headers
          if (line.includes(":")) {
            return `• ${line.trim()}`;
          }
          return line.trim();
        }).join("\n");

        return {
          header: header.startsWith("**") ? header : "", // Treat as header if it starts with Markdown bold (**)
          content: header.startsWith("**") ? content : section.trim(), // Treat as content if no header
        };
      });

      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? { ...chat, response: structuredResponse, loading: false } // Update the last chat
            : chat
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
      setChatHistory((prev) =>
        prev.map((chat, index) =>
          index === prev.length - 1
            ? {
              ...chat,
              response: [{ header: "Error", content: "An error occurred while fetching the response." }],
              loading: false,
            }
            : chat
        )
      );
    }
  };

  return (
    <div className="chatParent relative h-[89.5%] w-[100%] m-0 p-0 flex justify-center items-center">
      <div className="chat h-[100%] w-[55%] flex justify-center items-center relative">
        <div className="ChatBox absolute bottom-10 z-[999] h-[110px] w-full border-[1px] border-solid bg-[#1B1C1D] border-[#6d6d6d] rounded-3xl">
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
        <div ref={chatViewRef} className="chatView h-[78%] top-0 absolute w-[100%] flex flex-col gap-4 overflow-y-auto">
          {/* Render Chat History */}
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* User Input */}
              <div className="User self-end bg-[#333537] text-white p-2 px-4 rounded-b-4xl rounded-tl-4xl max-w-[60%] break-words hyphens-auto overflow-hidden">
                {chat.user}
              </div>
              {/* AI Response */}
              <div className="Response self-start text-wrap w-[98%] text-white p-2 rounded-lg">
                {chat.loading ? (
                  <div className="relative flex items-center">
                    {/* Loading Circle */}
                    <div className="absolute animate-spin h-8 w-8 border-4 border-solid border-transparent border-t-white rounded-full"></div>
                    {/* Gemini Logo */}
                    <img
                      src="/gemini_logo.svg"
                      alt="Gemini Logo"
                      className="h-8 w-8"
                    />
                    {/* Typing Indicator */}
                    <div className="ml-4 text-gray-400 italic">Gemini is typing...</div>
                  </div>
                ) : (
                  <div className="flex w-full items-center relative">
                    {/* Gemini Logo with margin */}
                    <img
                      src="/gemini_logo.svg"
                      alt="Gemini Logo"
                      className="h-6 w-6 mr-2 absolute top-0.5 left-0"
                    />
                    {/* Render the response */}
                    <div>
                      {chat.response.map((section, idx) => (
                        <div key={idx} className="mb-4 ml-10">
                          {/* Render the parent header */}
                          {section.header && (
                            <ReactMarkdown
                              components={{
                                h1: ({ node, ...props }) => <h1 className="font-bold text-lg" {...props} />,
                              }}
                            >
                              {section.header}
                            </ReactMarkdown>
                          )}
                          {/* Render the content with child headers */}
                          {section.content && (
                            <ReactMarkdown
                              components={{
                                p: ({ node, ...props }) => <p className="text-[15px] ml-4" {...props} />, // Indent child headers
                                li: ({ node, ...props }) => <li className="list-disc ml-6" {...props} />, // Add dots for child headers
                              }}
                            >
                              {section.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
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