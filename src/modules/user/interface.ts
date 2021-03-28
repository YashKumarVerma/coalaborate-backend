export interface UserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string

  // cannot monkey patch everything now
  firstname?: string
}

export interface CreateUserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}
