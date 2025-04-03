import React from 'react'
import RightSideApp from './RightSideApp'
import LeftSideApp from './LeftSideApp'
const App = () => {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <RightSideApp />
      <LeftSideApp />
    </div>
  )
}

export default App