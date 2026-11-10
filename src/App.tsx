import "./App.css";

import Sidebar from "./components/Sidebar";
import AuthProvider from "./context/AuthContext";
import ProjectProvider from "./context/ProjectContext";
import TaskProvider from "./context/TaskContext";
import Project from "./mainscreens/Project.tsx";

import ThemeProvider from './context/ThemeContext.tsx'
function App() {
  return (
 <ThemeProvider>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider> 
          <Sidebar />
          <Project/>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
