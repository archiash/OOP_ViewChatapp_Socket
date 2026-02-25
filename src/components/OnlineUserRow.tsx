import type { User } from '../types'

interface OnlineUserRowProps {
    users: User[]
}

export function OnlineUserRow({ users }: OnlineUserRowProps) {
    return (
        <div className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-[#242526] border-b border-[#e4e6eb] dark:border-[#3a3b3c] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-sm transition-colors">
            {users.length > 0 ? (
                users.map(u => (
                    <div key={u.userID} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="relative">
                            <div className="w-12 h-12 bg-[#e4e6eb] dark:bg-[#3a3b3c] rounded-full flex items-center justify-center text-[#050505] dark:text-[#e4e6eb] text-lg font-medium shadow-sm border border-[#e4e6eb] dark:border-[#3a3b3c]">
                                {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31a24c] border-2 border-white dark:border-[#242526] rounded-full"></div>
                        </div>
                        <span className="text-[12px] text-[#65676b] dark:text-[#b0b3b8] truncate w-14 text-center font-medium">
                            {u.username}
                        </span>
                    </div>
                ))
            ) : (
                <span className="text-[13px] text-[#65676b] dark:text-[#b0b3b8]">No users online</span>
            )}
        </div>
    )
}
