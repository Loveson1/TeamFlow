import { createContext, useContext, useState, type ReactNode } from "react";

interface Project {
  name: string;
  id: string;
  description: string;
}

interface ProjectContextType {
  projects: Project[];
  createProject: (name: string, description: string) => void;
}

interface ProjectProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default function ProjectProvider({ children }: ProjectProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj_0001",
      name: "Website Project",
      description: "A mini website project for a cook house in Abidjan",
    },
  ]);

  const createProject = (name: string, description: string) => {
    setProjects([
      ...projects,
      {
        id: `proj_${Math.random() * 1000}`,
        name: name,
        description: description,
      },
    ]);
  };

  return (
    <ProjectContext.Provider value={{ projects, createProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject():ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("Use Context in right component");
  }
  return context;
}

// i forgot how to add a new data into an array hence why i wrote the spread ... project that way how about now?
