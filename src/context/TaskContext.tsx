import { createContext, useContext, useState, type ReactNode } from "react";

// create the type for the task data structure and taskcontext

interface Task {
  id: string;
  name: string;
  description: string;
  projectId: string;
  assignedTo: string;
  status: "Todo" | "In-progress" | "Completed";
}

interface TaskContexType {
  tasks: Task[];
  createTask: (
    name: string,
    description: string,
    projectId: string,
    assignedTo: string,
  ) => void;
  updateTask: (
    id: string,
    updates: {name?: string; description?: string ; status?: Task["status"],}
  ) => void;
}

interface TaskProps {
  children: ReactNode;
}

// create context portal then context povider

const TaskContext = createContext<TaskContexType | undefined>(undefined);

export default function TaskProvider({ children }: TaskProps) {
  //create mockup data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task_001",
      name: "Buid cook house landing page",
      description:
        "Build a landing page that converts custormer and loads under 1 seconds ",
      projectId: "proj_0001",
      assignedTo: "usr_worker_2",
      status: "In-progress",
    },
  ]);

  const createTask = (
    name: string,
    description: string,
    projectId: string,
    assignedTo: string,
  ) => {
    setTasks([
      ...tasks,

      {
        id: `task_${Math.random() * 1000}`,
        name: name,
        description: description,
        projectId: projectId,
        assignedTo: assignedTo,
        status: "Todo",
      },
    ]);
  };

  const updateTask = (
    id: string,
    updates: {name?: string; description?: string ; status?: Task["status"],}
  ) => {
    setTasks(
      tasks.map((item) =>
        item.id == id ? { ...item, ...updates } : item,
      ),
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// create custom hook for safety
export function useTask(): TaskContexType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Use context in the right component");
  }
  return context;
}

// i have few question

// 1. if i want to use data from outside context instead of just copying the mockdata how will i do it
// 2. why do we write this custom saftey hook useTask useAuth i mean is it possible to use context in wrong component
// 3. why is update taking new status of todo inprgress and completed
// i noticed in the update function we are just mapping through to pick the item and not updating it info