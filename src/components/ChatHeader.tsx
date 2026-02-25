import { ChatIcon } from './ChatIcon'

interface ChatHeaderProps {
  username: string
  userNumber: number
  isDark: boolean
  onToggleTheme: () => void
}

export function ChatHeader({ username, userNumber, isDark, onToggleTheme }: ChatHeaderProps) {

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#242526] border-b border-[#e4e6eb] dark:border-[#3a3b3c] shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0084ff] rounded-full flex items-center justify-center">
          <ChatIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-[#050505] dark:text-white">Messenger</h1>
          <span className="text-[12px] text-[#65676b] dark:text-[#b0b3b8]">Active now</span>
        </div>
      </div>
      <div>
        <span className="text-[12px] text-[#65676b] dark:text-[#b0b3b8]">{userNumber} users are online</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="w-9 h-9 bg-[#e4e6eb] dark:bg-[#3a3b3c] rounded-full flex items-center justify-center hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] transition"
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
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e4e6eb] dark:bg-[#3a3b3c] rounded-full transition-colors">
          <div className="w-2 h-2 bg-[#31a24c] rounded-full"></div>
          <span className="text-[13px] font-medium text-[#050505] dark:text-white">{username}</span>
        </div>
      </div>
    </header>
  )
}
