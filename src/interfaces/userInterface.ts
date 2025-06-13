
export interface UserInfo {
  id: string;
  email: string;
  name: string;
}

export interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}