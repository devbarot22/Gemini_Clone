import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from './redux/toggleSlice';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/Settings';

const LeftSideApp = () => {
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const dispatch = useDispatch();

  const [showNewChatText, setShowNewChatText] = useState(true);
  const [showText, setShowText] = useState(false);
  
  // Timer to control the rendering of "New Chat" text
  useEffect(() => {
    if (!isToggled) {
      const timer = setTimeout(() => {
        setShowNewChatText(true);
      }, 250);
      const textTimer = setTimeout(() => {
        setShowText(true)
      }, 200)
      return () => clearTimeout(timer, textTimer);
    } else {
      setShowNewChatText(false);
      setShowText(false)
    }
  }, [isToggled]);

  return (
    <div
      className={`h-[100%] ${
        isToggled ? 'w-20 flex items-center' : 'w-80 pl-4'
      } bg-[#282A2C] flex flex-col justify-between absolute transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div className="top-LS flex flex-col relative">
        {/* Toggle Button */}
        <div
          className="icon space-y-1 mt-10 w-[50px] flex h-12 justify-center items-center rounded-full flex-col cursor-pointer transition-all ease-in-out bg-none hover:bg-gray-100"
          onClick={() => dispatch(toggle())}
        >
          <div className="w-5 h-[2.5px] bg-[#a4a4a4]"></div>
          <div className="w-5 h-[2.5px] bg-[#a4a4a4]"></div>
          <div className="w-5 h-[2.5px] bg-[#a4a4a4]"></div>
        </div>

        {/* Add Chat Section */}
        <div
          className={`addchat ${
            isToggled ? 'w-[50px] h-12 justify-center' : 'w-32 h-[55px] pl-4'
          } bg-[#202122] mt-20 rounded-full flex items-center cursor-pointer transition-all duration-300 ease-in-out`}
        >
          <img
            src="/plus-sign.png"
            className="h-5 rounded-4xl"
            alt="Add Chat"
          />
          {!isToggled && showNewChatText && (
            <p className="text-[#747576] ml-3 transition-opacity duration-300">
              New Chat
            </p>
          )}
        </div>

        {/* Recent Section */}
        <div className="chat">
          {!isToggled && showText && (
            <h4 className="text-white mt-10 ml-4 transition-opacity duration-300">
              Recent
            </h4>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`
      ${isToggled ? "items-center" : "ml-2"}
      bottom-LS w-full flex flex-col mb-5 justify-between h-40`}      
      >
        {/* Help */}
        <div className="icon1 h-10 flex items-center cursor-pointer">
          <HelpOutlineIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white transition-opacity duration-300 ml-2">
              Help
            </p>
          )}
        </div>

        {/* Activity */}
        <div className="icon2 h-10 flex items-center cursor-pointer">
          <RestoreIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white transition-opacity duration-300 ml-2">
              Activity
            </p>
          )}
        </div>

        {/* Settings */}
        <div className="icon3 h-10 flex items-center cursor-pointer">
          <SettingsIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white transition-opacity duration-300 ml-2">
              Setting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideApp;