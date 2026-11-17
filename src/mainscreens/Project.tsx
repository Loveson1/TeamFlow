/* For the prject screen
what context is needed here, 
- project context 
- auth context

what local data 

empty project state, 

loading project state ,

add project state modal for adding project

load more state

search project, 

project card options, 

Architecture

project heading
search and add bar
numbers of project with an horizontal line
project cards 
project cards contains option 
options includes view , edit, assign and delete
the view goes to the project where the tasks are
edit goes to form to edit project
asign assign either you or the unassign people or assign multiple people


what would worker see

no project assigned to you
he would see assigned project and can only view 
he wont see create project anywhere

*/

import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useProject } from "../context/ProjectContext";
import PopupMenu from "@/reuseable-components/PopupMenu";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "@/reuseable-components/ProjectForm";
import { mockUsers } from "../context/mockUsers";

export default function Project() {
  // Global state
  const { projects, deleteProject, createProject, updateProject } =
    useProject();
  const { user } = useAuth();
  //local state
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(6);
  const [open, setOpen] = useState<boolean>(false);

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  const focusOnMount = (el: HTMLElement | null) => el?.focus();
  const PAGE_SIZE = 6;

  const [editingId, setEditingId] = useState<string | null>();
  const [deleteId, setDeleteId] = useState<string | null>();
  const deletingProject = projects.find((p) => p.id === deleteId);

  const editingProject = projects.find((p) => p.id === editingId);

  return (
    <>
      <h1>Project</h1>

      <div className="my-10 flex-center gap-x-10!">
        <input
          value={searchQuery}
          onChange={(e) => {
            (setSearchQuery(e.target.value), setLimit(PAGE_SIZE));
          }}
          type="search"
          className="border-secondaryText border rounded p-1.75 w-full"
          placeholder="Search Projects"
        />
        {user?.role === "ADMIN" || (
          <button
            onClick={() => setOpen(true)}
            className=" flex-center text-nowrap button2 "
          >
            <LuPlus />
            Create Project{" "}
          </button>
        )}

        {open && (
          <ProjectForm
            title="Add"
            onClose={() => setOpen(false)}
            onSubmit={(data) => createProject(data.name, data.description)}
          />
        )}
      </div>

      <p className="font-bold mb-2">
        {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "Project" : "Projects"}
      </p>
      <hr className="mb-5 opacity-30" />

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-3 gap-5  ">
          {filteredProjects.slice(0, limit).map((project, index) => {
            const assignees = mockUsers.filter((u) =>
              project.assignedTo?.includes(u.id),
            );
            return (
              <div
                key={project.id}
                tabIndex={-1}
                // ref={
                //   limit > PAGE_SIZE && index === limit - PAGE_SIZE
                //     ? focusOnMount
                //     : null
                // }
                className="card hover:border-accent2/20 hover:border flex flex-col  rounded-xl px-5! cursor-pointer group "
              >
                <div className="flex justify-between gap-5">
                  <h2 className="mb-2">{project.name} </h2>
                  {user?.role === "ADMIN" || (
                    <PopupMenu>
                      <button className="w-full text-left">View</button>
                      <button
                        onClick={() => setEditingId(project.id)}
                        className="w-full text-left"
                      >
                        Edit
                      </button>

                      <button className="w-full text-left">Assign</button>

                      <hr className="my-1 opacity-30" />
                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="w-full text-left hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </PopupMenu>
                  )}
                </div>

                <p>{project.description} </p>
                <div className="flex gap-1 mt-auto pt-4 ">
                  {assignees.map((a) => (
                    <div className="flex-center">
                      <div
                        key={a.id}
                        title={a.name}
                        className="size-6 group rounded-full bg-purple text-white text-xs  flex items-center justify-center"
                      >
                        {a.name.charAt(0)}
                      </div>
                      <p className="opacity-0 group-hover:opacity-90">
                        {a.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card rounded-xl px-5! ">
          {user?.role === "ADMIN" ? (
            <h2 className="mb-2"> No Project Yet</h2>
          ) : (
            <p className="mb-2"> You've not been assigned any project yet!</p>
          )}

          {user?.role === "ADMIN" || (
            <div>
              <button
                onClick={() => setOpen(true)}
                className="flex-center px-4 m-auto"
              >
                <LuPlus /> Add New Project
              </button>
            </div>
          )}
        </div>
      )}
      {filteredProjects.length > limit && (
        <button
          className="mt-5 button3"
          onClick={() => setLimit((prev) => prev + 6)}
        >
          Load More
        </button>
      )}

      {editingProject && (
        <ProjectForm
          key={editingProject.id}
          title="Edit"
          onClose={() => setEditingId(null)}
          defaultValues={{
            name: editingProject.name,
            description: editingProject.description,
          }}
          onSubmit={(data) => updateProject(editingProject.id, data)}
        />
      )}

      {deletingProject && (
        <div className="bg-background/30 inset-0 fixed z-1 flex items-center justify-center ">
          <div className="card p-4! rounded-xl">
            <p className="my-5">
              Are you sure you want to delete "{deletingProject.name}"?
            </p>
            <div className=" flex-center ">
              <button
                className="button2 bg-red-800! hover:bg-red-700!"
                onClick={() => {
                  (deleteProject(deletingProject.id), setDeleteId(null));
                }}
              >
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="button2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
