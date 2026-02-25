import { MessageItem } from './MessageItem'
import { ChatIcon } from './ChatIcon'
import type { Message } from '../types'

interface MessageListProps {
  messages: Message[]
  currentUserID: string
  onDeleteMessage: (messageID: string) => void
  onEditMessage: (messageID: string, newMessage: string) => void
}

export function MessageList({ messages, currentUserID, onDeleteMessage, onEditMessage }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-3 py-4 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="flex flex-col items-center justify-center h-full text-[#65676b] dark:text-[#b0b3b8]">
          <ChatIcon className="w-16 h-16 mb-4 text-[#0084ff]" strokeWidth={1.5} />
          <p className="text-[15px]">No messages yet. Start the conversation!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 bg-white dark:bg-[#1a1a1a] space-y-0.5 transition-colors">
      {messages.map((msg) => (
        <MessageItem
          key={msg.messageID}
          message={msg}
          isOwn={msg.user.userID === currentUserID}
          onDelete={onDeleteMessage}
          onEdit={onEditMessage}
        />
      ))}
    </div>
  )
}
