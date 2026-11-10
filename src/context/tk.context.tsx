/*
So build a task context
tasks task data, creates task, updates task 
How d we do this

1. create a data type for task shape
2. create task context data type
3. create the provider children data type

4. Open the task context
5. create the provider
6. Within the provider ceate the create task function and update task function
7. Write a final guardrail that ensures context is used in the right component


*/

import { useState, useContext, type ReactNode, createContext } from "react";

interface task {
  id: string;
  name: string;
  des: string;
  projectId: string;
  assignedTo: string;
  status: "to-do" | "in-progress" | "completed";
}

interface taskType {
  tasks: task[];
  createTask: (
    name: string,
    des: string,
    projectId: string,
    assignedTo: string,
  ) => void;
  updateTask: (
    id: string,
    update: {
      name?: string;
      des?: string;
      projectId?: string;
      assignedTo?: string;
      status: task["status"];
    },
  ) => void;
}

interface taskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<taskType | undefined>(undefined);

export default function TaskProvider({ children }: taskProviderProps) {
  const [tasks, setTasks] = useState<task[]>([
    {   id: "task_001",
        name: "cook book",
        des: "create cook book",
        projectId:"proj_001",
        assignedTo: "usr_worker_2",
        status: "to-do"
    }
  ]);

  const createTask = (
    name: string,
    des: string,
    projectId: string,
    assignedTo: string,
  ) => {
    setTasks([
      ...tasks,
      {
        id: `task_${Math.random() * 1000}`,
        name: name,
        des: des,
        projectId: projectId,
        assignedTo: assignedTo,
        status: "to-do",
      },
    ]);
  };

  const updateTask = (
    id: string,
    update: {
      name?: string;
      des?: string;
      projectId?: string;
      assignedTo?: string;
      status?: task["status"];
    },
  ) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...update } : task)),
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}


export const useTask = ():taskType => {
 const context = useContext(TaskContext)
 if (!context){
    throw new Error ("use context in right component")
 } return context
}
