export interface LogInCredentials {
  email: string
  password: string
}
export interface LoginTokenData {
  email: string
  role: string
  name: string
}

export interface LogInResponse {
  token: string
}
