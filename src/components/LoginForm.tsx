import { useState } from 'react'
import { api } from '../api'
import { ChatIcon } from './ChatIcon'

interface LoginFormProps {
  onLogin: (userID: string, username: string) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function LoginForm({ onLogin, isDark, onToggleTheme }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setIsLoading(true)
    try {
      const userID = await api.registerUser(username.trim())
      onLogin(userID, username.trim())
    } catch (error) {
      console.error('Failed to register:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f0f2f5] dark:bg-[#1a1a1a] transition-colors">
      {/* Theme Toggle Button */}
      <button
        onClick={onToggleTheme}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-[#3a3b3c] shadow-md flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isDark ? (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#65676b]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="bg-white dark:bg-[#242526] rounded-lg shadow-lg p-8 w-full max-w-md transition-colors">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#0084ff] rounded-full mx-auto mb-4 flex items-center justify-center">
            <ChatIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#050505] dark:text-white">Messenger</h1>
          <p className="text-[#65676b] dark:text-[#b0b3b8] mt-2 text-[15px]">Enter your name to start chatting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-full text-[15px] text-[#050505] dark:text-white placeholder-[#65676b] dark:placeholder-[#b0b3b8] focus:outline-none focus:ring-2 focus:ring-[#0084ff] disabled:bg-[#e4e6eb] dark:disabled:bg-[#3a3b3c] transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full py-3 bg-[#0084ff] text-white font-semibold rounded-full hover:bg-[#0077e6] transition disabled:bg-[#e4e6eb] dark:disabled:bg-[#3a3b3c] disabled:text-[#bcc0c4] disabled:cursor-not-allowed"
          >
            {isLoading ? 'Joining...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
