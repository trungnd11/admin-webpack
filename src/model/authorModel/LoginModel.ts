export interface LoginModel {
  username: string
  password: string
  remember?: boolean
};
export interface LoginResponseEim {
  expiresIn: number
  granted: string[]
  refreshToken: string
  token: string
};
