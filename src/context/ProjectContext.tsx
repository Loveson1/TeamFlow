import { createContext, useContext, useState, type ReactNode } from "react";

interface Project {
  name: string;
  id: string;
  description: string;
  assignedTo: string[];
}

interface ProjectContextType {
  projects: Project[];
  createProject: (
    name: string,
    description: string,
    assignedTo: string[],
  ) => void;
  updateProject: (
    id: string,
    update: { name?: string; description?: string; assignedTo?: string[] },
  ) => void;
}

interface ProjectProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default function ProjectProvider({ children }: ProjectProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj_0010",
      name: "Website Project",
      description: "A mini website project for a cook house in Abidjan",
      assignedTo: ["usr_worker_2"],
    },
    {
      id: "proj_0002",
      name: "Brand Make Over",
      description: "Teamflow is rebranding her bsuiness which means new brand items, website and guideline.",
      assignedTo: ["usr_worker_3"],
    },

    {
      id: "proj_0003",
      name: "Marketing Campaign",
      description: "Teamflow need a marketig campaign for her brand that speaks to target audience in Abidjan",
      assignedTo: ["usr_worker_4"],
    },
    {
      id: "proj_0001",
      name: "Website Project",
      description: "A mini website project for a cook house in Abidjan",
      assignedTo: ["usr_worker_2"],
    },
   
    {
      id: "proj_0005",
      name: "Marketing Campaign",
      description: "Teamflow need a marketig campaign for her brand that speaks to target audience in Abidjan",
      assignedTo: ["usr_worker_4"],
    },
     {
      id: "proj_1002",
      name: "Brand Make Over",
      description: "Teamflow is rebranding her bsuiness which means new brand items, website and guideline.",
      assignedTo: ["usr_worker_3"],
    },

    {
      id: "proj_0303",
      name: "Marketing Campaign",
      description: "Teamflow need a marketig campaign for her brand that speaks to target audience in Abidjan",
      assignedTo: ["usr_worker_4"],
    },
    {
      id: "proj_0401",
      name: "Website Project",
      description: "A mini website project for a cook house in Abidjan",
      assignedTo: ["usr_worker_2"],
    },
   
    {
      id: "proj_0615",
      name: "Marketing Campaign",
      description: "Teamflow need a marketig campaign for her brand that speaks to target audience in Abidjan",
      assignedTo: ["usr_worker_4"],
    },
  ]);

  const createProject = (
    name: string,
    description: string,
    assignedTo: string[],
  ) => {
    setProjects((prev) => ([
      ...prev,
      {
        id: `proj_${crypto.randomUUID()}`,
        name: name,
        description: description,
        assignedTo: assignedTo,
      },
    ]));
  };

  const updateProject = (
    id: string,
    update: { name?: string; description?: string; assignedTo?: string[] },
  ) => {
    setProjects(
      (prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...update } : project,
      ),
    );
  };
  return (
    <ProjectContext.Provider value={{ projects, createProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("Use Context in right component");
  }
  return context;
}

