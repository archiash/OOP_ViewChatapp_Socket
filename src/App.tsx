import { useState, useEffect } from 'react'
import './index.css'
import { LoginForm, ChatHeader, MessageList, MessageInput, TypingIndicator, BlueScreen, OnlineUserRow } from './components'
import { useWebSocket } from './hooks/useWebSocket'
import type { Message, User } from './types'
import { api } from './api'

function App() {
  const { isConnected, connect, disconnect, subscribe, sendMessage, unsubscribe } = useWebSocket()
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  const [userNumber, setUserNumber] = useState<number>(0)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [showUsers, setShowUsers] = useState<boolean>(false)
  const [socketError, setSocketError] = useState<string | object | null>(null)


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

  useEffect(() => {
    if (user?.userID) {
      connect(user.userID)
      return () => disconnect()
    }
  }, [user?.userID])

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

  const fetchUserNumber = async () => {
    try {
      const data = await api.getUserNumber()
      console.log("user number fetched", data)
      setUserNumber(data)
    } catch (error) {
      console.error('Failed to fetch user number:', error)
    }
  }

  const fetchTypingUsers = async () => {
    try {
      const data = await api.getTypingUsers()
      console.log("typing users fetched", data)
      setTypingUsers(data)
    } catch (error) {
      console.error('Failed to fetch typing users:', error)
    }
  }

  const fetchOnlineUsers = async () => {
    try {
      const data = await api.getOnlineUsers()
      const filteredMessage = data.filter((user: User) => user.online === true)
      setOnlineUsers(filteredMessage)
    } catch (error) {
      console.error('Failed to fetch online users:', error)
    }
  }

  useEffect(() => {

    if (!isConnected) return

    fetchMessages()
    fetchUserNumber()
    fetchTypingUsers()
    fetchOnlineUsers()

    subscribe("/user/queue/errors", (payload) => {
      const message = payload.body
      console.log("error received", message)
      setSocketError(message)
    })

    subscribe("/topic/user-number", (payload) => {
      const message = JSON.parse(payload.body)
      setUserNumber(message)
    })

    subscribe("/topic/typing", (payload) => {
      const message = JSON.parse(payload.body)
      setTypingUsers(message)
    })

    subscribe("/topic/user-list", (payload) => {
      const message = JSON.parse(payload.body)
      console.log("user list received", message)
      const filteredMessage = message.filter((user: User) => user.online === true)
      setOnlineUsers(filteredMessage)
    })

    subscribe("/topic/messages", (payload) => {
      const message = JSON.parse(payload.body)
      console.log("message received", message)
      setMessages(message)
    })

    return () => {
      unsubscribe("/topic/user-number")
      unsubscribe("/topic/typing")
      unsubscribe("/topic/messages")
      unsubscribe("/topic/user-list")
      unsubscribe("/user/queue/errors")
    }

  }, [isConnected])

  const handleLogin = (id: string, name: string) => {
    setUser({ userID: id, username: name, online: true })
  }

  const handleSendMessage = async (message: string) => {
    if (!user) return

    sendMessage("/chat/message", {
      userID: user.userID,
      message,
    })
  }

  const handleTyping = async (isTyping: boolean) => {
    if (!user) return

    sendMessage("/chat/typing", {
      userID: user.userID,
      typing: isTyping,
    })
  }

  const handleDeleteMessage = async (messageID: string) => {
    if (!user) return

    sendMessage("/chat/delete-message", {
      userID: user.userID,
      messageID,
    })
  }

  const handleEditMessage = async (messageID: string, newMessage: string) => {
    if (!user) return

    sendMessage("/chat/edit-message", {
      messageID,
      userID: user.userID,
      newMessage,
    })
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} isDark={isDark} onToggleTheme={toggleTheme} />
  }

  if (socketError) {
    return <BlueScreen error={socketError} onReset={() => setSocketError(null)} />
  }

  return (
    <div className="h-screen w-full flex flex-col  bg-white dark:bg-[#1a1a1a] transition-colors">
      <ChatHeader username={user.username} userNumber={userNumber} showUsers={showUsers} isDark={isDark} onToggleTheme={toggleTheme} onToggleUsers={() => setShowUsers(!showUsers)} />
      {showUsers && <OnlineUserRow users={onlineUsers} />}
      <MessageList
        messages={messages}
        currentUserID={user.userID}
        onDeleteMessage={handleDeleteMessage}
        onEditMessage={handleEditMessage}
      />
      <TypingIndicator typingUsers={typingUsers} currentUserID={user.userID} />
      <MessageInput onSend={handleSendMessage} onTyping={handleTyping} />
    </div>
  )
}

export default App
