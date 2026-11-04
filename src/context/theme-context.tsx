import  {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

// define context type
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// create context

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// define context provider type
interface ThemeProviderProps {
  children: ReactNode;
}

// make context reusable by creating a function that exports it

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "light"
      ? root.classList.add("light")
      : root.classList.add("dark");
  }, [theme]);

 const toggleTheme = ()=>{
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
 }


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}



export const useTheme = ():ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context){
     throw new Error("Use context in right component")
    } return context;
}
