import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';

const Sidebar = () => {

  const { chats, SelectedChat, theme, setTheme, user } = useAppContext();
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
    filter: theme === 'dark' ? 'none' : 'invert(1)'
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
                <p style={timestampStyle}>{chat.updatedAt}</p>
              </div>
              <svg 
                className="delete-icon"
                style={deleteIconStyle}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"/>
              </svg>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar