import React from 'react'
import Navbar from './component/navbar'
import ChatComponent from './component/chatComponent'

const RightSideApp = () => {
  return (
    <div className="h-[100%] w-[100%] bg-[#1B1C1D] float-end relative">
      <div className="flex justify-center items-center h-[100vh] w-[100%] absolute">
        <h1 className="text-5xl bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">Hello There</h1>
      </div>
      <Navbar />
      <ChatComponent />
    </div>
  )
}

export default RightSideApp