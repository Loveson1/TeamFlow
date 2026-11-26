import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { mockUsers } from "./mockUsers";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/utils/supabase";

// this is used to clean up data gotten from supabase, as supabase returns data with several properties
function toAppUser(u: SupabaseUser): User {
  const email = u.email ?? "";
  return {
    name: email.split("@")[0],
    id: u.id,
    email,
    role: "ADMIN",
  };
}

// define the data type structure

export interface User {
  name: string;
  id: string;
  email: string;
  role: "ADMIN" | "WORKER";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (selectedRole: "ADMIN" | "WORKER") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this checks if a session exist (that is if anyone is logged in) 
    // to loading turn false and ui opens also when we reload it saves the session 
    // hence the session is retained of the user data
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? toAppUser(data.session.user) : null);
      setLoading(false);
    });

    // this listens and runs when auth changes : sign in, sign out or token refresh 
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? toAppUser(session.user) : null);
    });

    return () => data.subscription.unsubscribe();

  }, []);

  // used mockdata here to ensure we have one source of truth for users
  const login = (selectedRole: "ADMIN" | "WORKER") => {
    const found = mockUsers.find((u) => u.role === selectedRole);
    setUser(found ?? null);
  };

  const logout = async () => {
    await supabase.auth.signOut()
  };

  console.log({ loading, user })

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
