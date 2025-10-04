import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment'

const Sidebar = () => {

  const { chats, SelectedChat, theme, setTheme, user, navigate } = useAppContext();
  const [search, setSearch] = useState('')

  // Container styles
  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minWidth: '288px',
    padding: '20px',
    background: theme === 'dark'
      ? 'linear-gradient(to bottom, rgba(36, 33, 36, 0.3), rgba(0, 0, 0, 0.3))'
      : 'transparent',
    borderRight: '1px solid rgba(128, 96, 159, 0.3)',
    backdropFilter: 'blur(64px)',
    transition: 'all 0.5s',
    position: 'relative',
    zIndex: 10
  }

  // Logo styles
  const logoStyle = {
    width: '100%',
    maxWidth: '192px'
  }

  // Button styles
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '8px 0',
    marginTop: '40px',
    background: 'linear-gradient(to right, #A456F7, #3D81F6)',
    color: 'white',
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none'
  }

  // Search container styles
  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    marginTop: '16px',
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#9CA3AF'}`,
    borderRadius: '6px'
  }

  // Input styles
  const inputStyle = {
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    background: 'transparent',
    border: 'none',
    color: theme === 'dark' ? 'white' : 'black'
  }

  // Placeholder styles (needs separate CSS)
  const placeholderStyle = {
    color: '#9CA3AF'
  }

  // Recent chats title
  const recentChatsStyle = {
    marginTop: '16px',
    fontSize: '14px',
    color: theme === 'dark' ? 'white' : 'black'
  }

  // Chats container
  const chatsContainerStyle = {
    flex: 1,
    overflowY: 'scroll',
    marginTop: '12px',
    fontSize: '14px'
  }

  // Individual chat item
  const chatItemStyle = {
    padding: '8px 16px',
    background: theme === 'dark' ? 'rgba(87, 49, 124, 0.1)' : 'transparent',
    border: `1px solid ${theme === 'dark' ? 'rgba(128, 96, 159, 0.15)' : '#D1D5DB'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  }

  // Chat text
  const chatTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    color: theme === 'dark' ? 'white' : 'black'
  }

  // Timestamp
  const timestampStyle = {
    fontSize: '12px',
    color: theme === 'dark' ? '#B1A6C0' : '#6B7280'
  }

  // Delete icon
  const deleteIconStyle = {
    display: 'none',
    width: '16px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#ffffff' : '#000000'
  }

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <img
        src={theme === 'dark' ? assets.log_full : assets.logo_full_dark}
        alt=""
        style={logoStyle}
      />

      {/* New Chat Button */}
      <button style={buttonStyle}>
        <span style={{ marginRight: '8px', fontSize: '20px' }}>+</span>
        New Chat
      </button>

      {/* Search Conversations */}
      <div style={searchContainerStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width={20}
          height={20}
          style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}
        >
          <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
        </svg>
        <input
          className='sidebar-input'
          onChange={(e) => { setSearch(e.target.value) }}
          value={search}
          type="text"
          placeholder='Search Conversations'
          style={inputStyle}
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p style={recentChatsStyle}>Recent Chats</p>}
      <div style={chatsContainerStyle}>
        {
          chats.filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          ).map((chat) => (
            <div
              key={chat._id}
              style={chatItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.delete-icon').style.display = 'block';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.delete-icon').style.display = 'none';
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={chatTextStyle}>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                <p style={timestampStyle}>{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <svg
                className="delete-icon"
                style={deleteIconStyle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
              </svg>
            </div>
          ))
        }
      </div>

      {/* Community Images */}
      <div onClick={() => { navigate('/community') }} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <div>
          <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#4F46E5"/>
            <rect x="6" y="8" width="20" height="16" rx="2" fill="white"/>
            <circle cx="12" cy="14" r="2" fill="#EF4444"/>
            <path d="M18 12L24 16L18 20V12Z" fill="#10B981"/>
            <rect x="8" y="20" width="16" height="2" rx="1" fill="#9CA3AF"/>
          </svg>
          <p>Community Images</p>
        </div>
      </div>
      
      {/* Credits Purchases options */}
      <div onClick={() => { navigate('/credits') }} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Layer_1" width="20px" height="20px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
            <g>
              <path d="M68.193,19.713L60.171,8.027c-1.539-2.262-4.937-3.967-7.903-3.967H19.721c-2.966,0-6.363,1.708-7.893,3.96L3.784,19.652   c-1.711,2.52-1.62,6.4,0.207,8.836l28.002,37.329c1.014,1.352,2.476,2.125,4.01,2.125c1.528,0,2.983-0.771,3.99-2.113l28.004-37.33   C69.842,26.035,69.93,22.262,68.193,19.713z M52.268,8.06c0.088,0,0.181,0.014,0.271,0.02l-0.782,0.715   c-0.408,0.372-0.436,1.005-0.064,1.412c0.197,0.217,0.469,0.326,0.74,0.326c0.239,0,0.48-0.086,0.674-0.262l1.718-1.569   c0.867,0.41,1.633,0.975,2.046,1.583l8.023,11.687c0.212,0.311,0.354,0.688,0.441,1.089h-26.24l8.34-7.612   c0.406-0.371,0.436-1.004,0.063-1.412c-0.371-0.407-1.005-0.438-1.413-0.064l-9.826,8.969c-0.038,0.035-0.056,0.081-0.087,0.119h-1   c-0.031-0.039-0.049-0.084-0.086-0.118L18.878,8.149c0.289-0.052,0.573-0.089,0.843-0.089H52.268z M15.127,10.282   c0.344-0.506,0.939-0.979,1.63-1.362L32.248,23.06H20.23c-0.001,0-0.001,0-0.002,0H6.743c-0.038,0-0.07,0.018-0.107,0.021   c0.083-0.435,0.226-0.842,0.447-1.167L15.127,10.282z M7.19,26.088c-0.217-0.289-0.375-0.647-0.481-1.035   c0.012,0,0.022,0.007,0.034,0.007h12.781l0.949,2.375c0.155,0.395,0.532,0.635,0.932,0.635c0.121,0,0.244-0.022,0.364-0.069   c0.513-0.201,0.767-0.781,0.566-1.295l-0.657-1.646h28.471l-14.16,36.531L25.008,33.534c-0.201-0.513-0.782-0.769-1.296-0.566   c-0.514,0.201-0.767,0.781-0.566,1.295l10.712,27.375L7.19,26.088z M38.093,61.697L52.294,25.06h12.988   c-0.106,0.386-0.266,0.744-0.485,1.038L38.093,61.697z"/>
              <path d="M49.329,13.365c0.241,0,0.483-0.087,0.674-0.262l0.696-0.636c0.406-0.373,0.436-1.005,0.063-1.413   c-0.371-0.406-1.004-0.434-1.412-0.063l-0.695,0.636c-0.407,0.372-0.437,1.005-0.063,1.413   C48.788,13.256,49.059,13.365,49.329,13.365z"/>
              <path d="M23.659,30.087l-0.351-0.895c-0.201-0.511-0.78-0.767-1.296-0.564c-0.513,0.201-0.767,0.781-0.566,1.295l0.351,0.895   c0.156,0.395,0.533,0.635,0.932,0.635c0.121,0,0.245-0.022,0.364-0.069C23.607,31.183,23.861,30.603,23.659,30.087z"/>
            </g>
          </svg>
          <p>Credits : {user?.credits}</p>
          <p className='text-xs text-gray-400'>Purchase Credits to use Codeduple</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      

    </div>
  )
}

export default Sidebar