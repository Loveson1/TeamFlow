import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  replace,
  RouterProvider,
} from "react-router-dom";
import Project from "./mainscreens/Project.tsx";
import ProjectTasks from "./mainscreens/ProjectTask.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import ProjectProvider from "./context/ProjectContext.tsx";
import TaskProvider from "./context/TaskContext.tsx";
import SearchModal from "./reuseable-components/SearchModal.tsx";
import LoginForm from "./components/login-form.tsx";
import { SignUpForm } from "./components/sign-up-form.tsx";
import { ForgotPasswordForm } from "./components/forgot-password-form.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
import RequiredAuth from "./mainscreens/RequiredAuth.tsx";

const router = createBrowserRouter([
  { path: "/signup", element: <SignUpForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/password", element: <ForgotPasswordForm /> },
  { path: "*", element: <PageNotFound /> },
  
  {
    element: <RequiredAuth />,
    children: [
      {
        path: "/",
        element: <App />,

        children: [
          { index: true, element: <Navigate to="/project" replace /> },
          { path: "project", element: <Project /> },
          { path: "project/:projectId", element: <ProjectTasks /> },
          { path: "123", element: <SearchModal /> },
        ],
      },
    ],
  },
]);

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
