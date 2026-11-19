import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Project from "./mainscreens/Project.tsx";
import ProjectTasks from "./mainscreens/ProjectTask.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import ProjectProvider from "./context/ProjectContext.tsx";
import TaskProvider from "./context/TaskContext.tsx";

const router = createBrowserRouter([{


 path: "/",
 element: <App/>,

 children:  [
  {index: true , element:<Navigate to="/project" replace/> },
  { path: "project", element: <Project /> },
  { path: "project/:projectId", element: <ProjectTasks /> },
]}]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <RouterProvider router={router} />
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
