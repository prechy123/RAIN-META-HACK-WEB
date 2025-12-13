
export interface IUser {
  id: string
  business_id: string
}

export interface AuthState extends IUser {
  isAuthenticated: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
}
export interface RootState {
  auth: AuthState;
}
