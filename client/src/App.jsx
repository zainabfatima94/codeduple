import React from 'react'
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Message from './components/Message'
import Credits from './page/Credits'
import Community from './page/Community'

const App = () => {
  return (
    <>
      <div className='dark:bg-gradient-to-b from[#242124] to-[#000000] dark:text-white'>
        <div className='flex h-screen w-screen'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App