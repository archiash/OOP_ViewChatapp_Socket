import { useState } from 'react'
import type { Message } from '../types'

interface MessageItemProps {
  message: Message
  isOwn: boolean
  onDelete: (messageID: string) => void
  onEdit: (messageID: string, newMessage: string) => void
}

export function MessageItem({ message, isOwn, onDelete, onEdit }: MessageItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message.message)

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== message.message) {
      onEdit(message.messageID, editText.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditText(message.message)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }
  if (message.deleted) {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
        <div className="flex flex-col gap-0.5">
          {!isOwn && (
            <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-3">
              {message.user.username || message.user.userID.slice(0, 8)}
            </span>
          )}
          <div className="rounded-[18px] px-3 py-2 bg-[#f0f0f0] dark:bg-[#3a3b3c] border border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 italic">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              <span className="text-[13px]">Message removed</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'} mb-0.5 group`}>
      {isOwn && !isEditing && (
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(message.messageID)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex flex-col gap-0.5 max-w-[65%]">
        {!isOwn && (
          <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-3">
            {message.user.username || message.user.userID.slice(0, 8)}
          </span>
        )}
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="px-3 py-2 bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-[18px] text-[15px] text-[#050505] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            />
            <button
              onClick={handleSaveEdit}
              className="text-[#0084ff] hover:text-[#0077e6] p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className={`rounded-[18px] px-3 py-2 ${
              isOwn
                ? 'bg-[#0084ff] text-white'
                : 'bg-[#e4e6eb] dark:bg-[#3a3b3c] text-[#050505] dark:text-white'
            }`}
          >
            <p className="text-[15px] break-words leading-snug">{message.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
