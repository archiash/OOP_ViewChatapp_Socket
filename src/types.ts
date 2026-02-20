export interface User {
  userID: string
  username: string
}

export interface Message {
  messageID: string
  user: User
  message: string
  deleted?: boolean
}
