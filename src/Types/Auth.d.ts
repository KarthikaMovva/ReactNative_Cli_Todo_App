export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  currentUserEmail: string | null;
  setCurrentUserEmail: (email: string | null) => void;
  logout: () => void;
}