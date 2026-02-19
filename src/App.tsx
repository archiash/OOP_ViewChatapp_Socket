import { useState, useEffect } from 'react'
import './index.css'
import type { Message } from './types'
import { api } from './api'
import { LoginForm, ChatHeader, MessageList, MessageInput } from './components'

function App() {
  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [searchFilter, setSearchFilter] = useState('')
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  const fetchMessages = async (filter?: string) => {
    try {
      const data = filter
        ? await api.searchMessages(filter)
        : await api.getMessages()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  useEffect(() => {
    if (userID) {
      fetchMessages(searchFilter || undefined)
      const interval = setInterval(() => fetchMessages(searchFilter || undefined), 1500)
      return () => clearInterval(interval)
    }
  }, [userID, searchFilter])

  const handleSearch = (filter: string) => {
    setSearchFilter(filter)
  }

  const handleLogin = (id: string, name: string) => {
    setUserID(id)
    setUsername(name)
  }

  const handleSendMessage = async (message: string) => {
    if (!userID) return

    try {
      const success = await api.sendMessage(userID, username, message)
      if (success) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleDeleteMessage = async (messageID: string) => {
    if (!userID) return

    try {
      const success = await api.deleteMessage(userID, messageID)
      if (success) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const handleEditMessage = async (messageID: string, newMessage: string) => {
    if (!userID) return

    try {
      const success = await api.editMessage(messageID, userID, newMessage)
      if (success) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to edit message:', error)
    }
  }

  if (!userID) {
    return <LoginForm onLogin={handleLogin} isDark={isDark} onToggleTheme={toggleTheme} />
  }

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto bg-white dark:bg-[#1a1a1a] transition-colors">
      <ChatHeader username={username} onSearch={handleSearch} isDark={isDark} onToggleTheme={toggleTheme} />
      <MessageList
        messages={messages}
        currentUserID={userID}
        onDeleteMessage={handleDeleteMessage}
        onEditMessage={handleEditMessage}
      />
      <MessageInput onSend={handleSendMessage} />
    </div>
  )
}

export default App
