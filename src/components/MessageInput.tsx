import React, { useState } from 'react'

interface MessageInputProps {
  onSend: (message: string) => void
  onTyping?: (isTyping: boolean) => void
}

export function MessageInput({ onSend, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    onSend(message.trim())
    setMessage('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="px-3 py-2 bg-white dark:bg-[#242526] border-t border-[#e4e6eb] dark:border-[#3a3b3c] transition-colors">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Aa"
          value={message}
          onChange={handleChange}
          onFocus={() => onTyping?.(true)}
          onBlur={() => onTyping?.(false)}
          className="flex-1 px-4 py-2 bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-full text-[15px] text-[#050505] dark:text-white placeholder-[#65676b] dark:placeholder-[#b0b3b8] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-9 h-9 flex items-center justify-center text-[#0084ff] hover:bg-[#f0f2f5] rounded-full transition disabled:text-[#bcc0c4] disabled:cursor-not-allowed"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </form>
  )
}
