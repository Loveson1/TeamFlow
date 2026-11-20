/*
State it will use includes
Auth
Project
Task

architecture/
Project name and brief description

Create task button
task cards
task card options modal - view, edit, delete, update status, assign
update status determine card color
Create task form

view project - modal


local datas

Create task state
edit state
delete state
update status state
assign state


what happens to a task after its done?


*/
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockUsers } from "@/context/mockUsers";
import { useProject } from "@/context/ProjectContext";
import { useTask } from "@/context/TaskContext";
import ComboBox from "@/reuseable-components/ComboBox";
import PopupMenu from "@/reuseable-components/PopupMenu";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import TaskForm from "@/reuseable-components/TaskForm";
import ConfirmModal from "@/reuseable-components/Confirmation";

export default function ProjectTasks() {
  // global state
  const { user } = useAuth();
  const { tasks, createTask, deleteTask, updateTask } = useTask();
  const { projects } = useProject();

  const [open, setOpen] = useState<boolean>(false); // for create task form modal
  const [limit, setLimit] = useState(6); // for project project card numbers

  const { projectId } = useParams(); // this is use to get the loaded page projectId, which is what is used to navigate to this page so it more like a inhouse useContext portal hook

  const project = projects.find((project) => project.id === projectId); // this is here to get project details and to verify that a project task exist for error state

  const projectTasks = tasks.filter((task) => task.projectId === projectId); // this filters through task and only shows task under a projectid

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deletingTask = projectTasks.find((task) => task.id === deletingId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingTask = projectTasks.find((task) => task.id === editingId);

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <>
      <h1>{project.name}</h1>
      <button className="p-0! hover:bg-transparent!">
        {project.description}
      </button>
      <div className="mt-10 mb-4 flex-center justify-between">
        <p className="font-bold ">
          {projectTasks.length}{" "}
          {projectTasks.length === 1 ? "Task" : "Tasks"}{" "}
        </p>
        {user?.role === "ADMIN" || (
          <button
            onClick={() => setOpen(true)}
            className=" flex-center text-nowrap button2 "
          >
            <LuPlus />
            Create Task
          </button>
        )}
      </div>

      <hr className="mb-5 " />

      {/* task cards */}
      {projectTasks.length > 0 ? (
        <div className="grid grid-cols-3 gap-5  ">
          {projectTasks.map((task) => {
            const assignees = mockUsers.filter((u) =>
              task.assignedTo?.includes(u.id),
            );
            return (
              <div
                key={task.id}
                className="card hover:border-accent2/20 hover:border flex flex-col  rounded-xl px-5! cursor-pointer group "
              >
                <div className="flex justify-between gap-5">
                  <h2 className="mb-2">{task.name} </h2>
                  {user?.role === "ADMIN" || (
                    <PopupMenu>
                      <button className="w-full text-left">View</button>
                      <button onClick={()=>setEditingId(task.id)} className="w-full text-left">Edit</button>
                      <button className="w-full text-left">Status</button>
                      <hr className="my-1 opacity-30" />

                      <button
                        onClick={() => setDeletingId(task.id)}
                        className="w-full text-left hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </PopupMenu>
                  )}
                </div>

                <p>{task.description} </p>
                <div className="flex mt-auto pt-4 ">
                  <ComboBox>
                    {assignees.map((a) => (
                      <div key={a.id} className="flex-center ">
                        <div
                          title={a.name}
                          className="size-6 group rounded-full  bg-purple text-white text-xs  flex items-center justify-center"
                        >
                          {a.name.charAt(0)}
                        </div>
                      </div>
                    ))}
                  </ComboBox>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card rounded-xl px-5! ">
          {user?.role === "ADMIN" ? (
            <h2 className="mb-2"> No Task Yet</h2>
          ) : (
            <p className="mb-2"> You've not been assigned any task yet!</p>
          )}

          {user?.role === "ADMIN" || (
            <div>
              <button
                onClick={() => setOpen(true)}
                className="flex-center px-4 m-auto"
              >
                <LuPlus /> Create New Task
              </button>
            </div>
          )}
        </div>
      )}

      {projectTasks.length > limit && (
        <button
          className="mt-5 button3"
          onClick={() => setLimit((prev) => prev + 6)}
        >
          Load More
        </button>
      )}

      {open && (
        <TaskForm
          title="Create Task"
          onSubmit={(data) =>
            createTask(data.name, data.description, project.id)
          }
          onClose={() => setOpen(false)}
        />
      )}

      {deletingTask && (
        <ConfirmModal
          onConfirm={() => {
            deleteTask(deletingTask.id);
            setDeletingId(null);
          }}
          onCancel={() => setDeletingId(null)}
          Message={`Are you sure you want to delete ${deletingTask.name}`}
        />
      )}

      {editingTask && (
          <TaskForm
          title="Edit Task"
          defaultValues={{name: editingTask.name, description:editingTask.description }}
          onSubmit={(data) => {
            updateTask(editingTask.id, data);
            setEditingId (null);}
          }
          onClose={() => setEditingId(null)}
        />

      )}
    </>
  );
}
