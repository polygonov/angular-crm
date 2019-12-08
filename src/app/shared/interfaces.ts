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

export interface Category {
  name: string,
  capacity: number,
  id?: number
}

export interface CRMEvent {
  type: string,
  amount: number,
  category: number,
  date: string,
  id?: number,
  description: string,
  catName?: string
}
