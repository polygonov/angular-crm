export interface User {
  email: string,
  password: string,
  name: string,
  id?: number
}

export interface Message {
  type: string,
  text: string
}
