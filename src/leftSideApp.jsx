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
        isToggled ? 'w-20' : 'w-80'
      } bg-[#282A2C] pl-4 flex flex-col justify-between absolute transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div className="top-LS flex flex-col relative">
        {/* Toggle Button */}
        <div
          className="icon space-y-1 mt-10 w-9 flex h-9 justify-center items-center rounded-full flex-col cursor-pointer ml-2 transition-all ease-in-out bg-none hover:bg-gray-100"
          onClick={() => dispatch(toggle())}
        >
          <div className="w-4.5 h-[2.5px] bg-[#a4a4a4]"></div>
          <div className="w-4.5 h-[2.5px] bg-[#a4a4a4]"></div>
          <div className="w-4.5 h-[2.5px] bg-[#a4a4a4]"></div>
        </div>

        {/* Add Chat Section */}
        <div
          className={`addchat ${
            isToggled ? 'w-[50px] h-12' : 'w-32 h-[55px]'
          } bg-[#202122] mt-20 rounded-full flex items-center cursor-pointer transition-all duration-300 ease-in-out`}
        >
          <img
            src="/plus-sign.png"
            className="h-5 rounded-4xl pl-4"
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
      <div className="bottom-LS w-full flex flex-col mb-5 justify-between h-40">
        {/* Help */}
        <div className="icon2 flex items-center ml-2 cursor-pointer">
          <HelpOutlineIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white ml-2 transition-opacity duration-300">
              Help
            </p>
          )}
        </div>

        {/* Activity */}
        <div className="icon2 flex items-center ml-2 cursor-pointer">
          <RestoreIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white ml-2 transition-opacity duration-300">
              Activity
            </p>
          )}
        </div>

        {/* Settings */}
        <div className="icon2 flex items-center ml-2 cursor-pointer">
          <SettingsIcon className="text-white" />
          {!isToggled && showText && (
            <p className="text-white ml-2 transition-opacity duration-300">
              Setting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideApp;