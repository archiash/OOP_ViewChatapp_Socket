import type { User } from '../types'

interface TypingIndicatorProps {
    typingUsers: User[]
    currentUserID: string
}

export function TypingIndicator({ typingUsers, currentUserID }: TypingIndicatorProps) {
    const othersTyping = typingUsers.filter((u) => u.userID !== currentUserID)

    let typingText = ""
    if (othersTyping.length === 1) {
        typingText = `${othersTyping[0].username} is typing`
    } else if (othersTyping.length === 2) {
        typingText = `${othersTyping[0].username} and ${othersTyping[1].username} are typing`
    } else if (othersTyping.length > 2) {
        typingText = `${othersTyping.length} people are typing`
    }

    const isVisible = othersTyping.length > 0;

    return (
        <div className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a1a] transition-all min-h-[36px] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-sm italic text-[#65676b] dark:text-[#b0b3b8]">{typingText}</span>
            {isVisible && (
                <div className="flex space-x-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-[#65676b] dark:bg-[#b0b3b8] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#65676b] dark:bg-[#b0b3b8] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#65676b] dark:bg-[#b0b3b8] rounded-full animate-bounce"></div>
                </div>
            )}
        </div>
    )
}
