export interface PhoneBookRecord {
  id?: number
  phone: string
  name: string
  surname?: string
  secondName?: string
  email?: string
  description?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  error: string
}

export interface PhoneBookFormData {
  phone: string
  name: string
  surname: string
  secondName: string
  email: string
  description: string
}
