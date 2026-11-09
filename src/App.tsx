import "./App.css";

import Sidebar from "./components/Sidebar";
import AuthProvider from "./context/AuthContext";
import ProjectProvider from "./context/ProjectContext";
import TaskProvider from "./context/TaskContext";

import ThemeProvider from './context/ThemeContext.tsx'
function App() {
  return (
 <ThemeProvider>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider> 
          <Sidebar />
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
