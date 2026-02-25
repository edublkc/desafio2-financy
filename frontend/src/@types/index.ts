export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Category {
  id: string
  title: string
  description: string
  iconName?: string
  iconColor?: string
  createdAt?: string
  updatedAt?: string
  authorId: string
  author?: User
  countTransactionByUser?: number
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: Date
  createdAt?: string
  updatedAt?: string
  userId: string
  user?: User
  categoryId: string
  category?: Category
}