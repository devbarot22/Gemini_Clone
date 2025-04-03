import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isToggled = useSelector((state) => state.toggle.isToggled); // Get toggle state

  return (
    <div className="flex h-20 relative w-full justify-center items-center">
      <h1
        className={`text-[#ffffff] text-[22px] absolute p-0 m-0 transition-all duration-300 ${
          isToggled ? 'left-[6rem]' : 'left-[21rem]'
        }`}
      >
        Gemini
      </h1>
      <i className="w-8 h-8 bg-red-950 rounded-3xl absolute text-center p-0 m-0 right-10">
        H
      </i>
    </div>
  );
};

export default Navbar;