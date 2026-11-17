import { createContext, useContext, useState, type ReactNode } from "react";
import { mockUsers } from "./mockUsers";

// define the data type structure

export interface User {
  name: string;
  id: string;
  email: string;
  role: "ADMIN" | "WORKER";
}

interface AuthContextType {
  user: User | null;
  login: (selectedRole: "ADMIN" | "WORKER") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // used mockdata here to ensure we have one source of truth for users

  const login = (selectedRole: "ADMIN" | "WORKER") => {
    const found = mockUsers.find((u) => u.role === selectedRole);
    setUser(found ?? null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(" Use Context in right component");
  }
  return context;
};
