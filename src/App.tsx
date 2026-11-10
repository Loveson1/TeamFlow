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
          <div className="flex min-h-screen bg-background text-text">
              
              <Sidebar />

              <main className="flex-1 p-6 ">
                <Project />
              </main>

            </div>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
