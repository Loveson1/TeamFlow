import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// define the data type structure

interface User {
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

  const login = (selectedRole: "ADMIN" | "WORKER") => {
    setUser({
      name: selectedRole === "ADMIN" ? "Ade(Admin)" : "Ola(Worker)",
      id: selectedRole === "ADMIN" ? "usr_admin_1" : "usr_worker_2",
      email: `${selectedRole.toLowerCase()}@taskflow.com`,
      role: selectedRole,
    });
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

    const context = useContext(AuthContext)
    if(!context){
       throw new Error(" Use Context in right component")
    } return context

}
