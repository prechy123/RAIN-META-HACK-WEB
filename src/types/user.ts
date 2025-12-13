export interface AuthState {
  isAuthenticated: boolean;
  id: string;
  business_id: string;
  setAuth: (auth: AuthState) => void;
  logout: () => void;
}
