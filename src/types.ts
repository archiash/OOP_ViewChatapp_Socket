export interface User {
  userID: string
  username: string
  online: boolean
}

export interface Message {
  messageID: string
  user: User
  message: string
  deleted?: boolean
}
