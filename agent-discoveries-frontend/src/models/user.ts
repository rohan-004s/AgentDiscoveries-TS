export interface User {
  userId: number
  username: string
  hashedPassword: string
  agentId?: number
  admin: boolean
  imageUrl: string
}
