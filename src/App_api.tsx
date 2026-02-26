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
        if (user?.userID) {
            fetchMessages()
            const interval = setInterval(() => fetchMessages(), 1500)
            return () => clearInterval(interval)
        }
    }, [user?.userID])


    const handleLogin = (id: string, name: string) => {
        setUser({ userID: id, username: name })
    }

    const handleSendMessage = async (message: string) => {
        if (!user?.userID) return

        try {
            const success = await api.sendMessage(user.userID, user.username, message)
            if (success) {
                fetchMessages()
            }
        } catch (error) {
            console.error('Failed to send message:', error)
        }
    }

    const handleDeleteMessage = async (messageID: string) => {
        if (!user?.userID) return

        try {
            const success = await api.deleteMessage(user.userID, messageID)
            if (success) {
                fetchMessages()
            }
        } catch (error) {
            console.error('Failed to delete message:', error)
        }
    }

    const handleEditMessage = async (messageID: string, newMessage: string) => {
        if (!user?.userID) return

        try {
            const success = await api.editMessage(messageID, user.userID, newMessage)
            if (success) {
                fetchMessages()
            }
        } catch (error) {
            console.error('Failed to edit message:', error)
        }
    }

    const handleTyping = async (isTyping: boolean) => {
        if (!user) return

        sendMessage("/chat/typing", {
            userID: user.userID,
            typing: isTyping,
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
