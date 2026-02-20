import type { Message } from './types'

export const API_BASE =  import.meta.env.VITE_API_URL 

export const api = {
  // Fetch all messages
  getMessages: async (): Promise<Message[]> => {
    const res = await fetch(`${API_BASE}/message`)
    if (res.ok) {
      return res.json()
    }
    throw new Error('Failed to fetch messages')
  },

  // Register a new user
  registerUser: async (username: string): Promise<string> => {
    const res = await fetch(`${API_BASE}/user/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
    if (res.ok) {
      const id = await res.text()
      return id.replace(/"/g, '')
    }
    throw new Error('Failed to register user')
  },

  // Send a message
  sendMessage: async (userID: string, userName: string, message: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/message/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, userName, message })
    })
    return res.ok
  },

  // Delete a message
  deleteMessage: async (userID: string, messageID: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/message/${userID}/${messageID}`, {
      method: 'DELETE'
    })
    return res.ok
  },

  // Search messages
  searchMessages: async (filter: string): Promise<Message[]> => {
    const res = await fetch(`${API_BASE}/message/search?filter=${encodeURIComponent(filter)}`)
    if (res.ok) {
      return res.json()
    }
    throw new Error('Failed to search messages')
  },

  // Edit a message
  editMessage: async (messageID: string, userID: string, newMessage: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/message/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, messageID, newMessage })
    })
    return res.ok
  }
}
