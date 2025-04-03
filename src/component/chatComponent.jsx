import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const ChatComponent = () => {
  return (
    <div className="chatParent relative h-[89.5%] w-[100%] m-0 p-0 flex justify-center items-center">
      <div className='h-[100%] w-[55%] flex justify-center items-center'>
        {/* <div className="ChatArea"></div> */}
        <div className="ChatBox absolute bottom-10 h-[110px] w-[52%] border-[1px] border-solid border-[#6d6d6d] rounded-3xl">
          {/* <input type="text" name='enterPrompt' className="">Ask Gemini</input> */}
          <input type="text" name="promptArea" placeholder='Ask Gemini' className='top h-1/2 pl-4 rounded-tl-3xl rounded-tr-3xl border-none focus:outline-none w-full flex items-center text-[17px] text-white font-medium'/>
          <div className="bottom h-1/2 flex items-center">
            <div className="bg-[#262627] ml-3 w-10 h-10 flex items-center justify-center rounded-4xl">
              <AddIcon className='text-[#747576] cursor-pointer' sx={{fontSize: 30}} />
            </div>
            <div className="bg-[#262627] ml-6 w-34 h-10 flex items-center justify-center cursor-pointer rounded-4xl">
              <AddIcon className='text-[#747576] cursor-pointer'/>
              <p className='text-[#747576]'>Deep Search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent