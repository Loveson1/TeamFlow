import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useProject } from "../context/ProjectContext";
import PopupMenu from "../reuseable-components/PopupMenu";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../reuseable-components/ProjectForm";
import { mockUsers } from "../context/mockUsers";
import ComboBox from "../reuseable-components/ComboBox";
import ConfirmModal from "@/reuseable-components/Confirmation";
import { Link, useNavigate } from "react-router-dom";

export default function Project() {
  // Global state
  const { projects, deleteProject, createProject, updateProject } =
    useProject();
  const { user } = useAuth();

  //local states for managing different states
  const [searchQuery, setSearchQuery] = useState(""); // for filter
  const [limit, setLimit] = useState(6); // for project project card numbers
  const [open, setOpen] = useState<boolean>(false); // for create project form modal
  const [editingId, setEditingId] = useState<string | null>(null); // for editing modal
  const [deletingId, setDeletingId] = useState<string | null>(null); // for delete modal

  const deletingProject = projects.find((p) => p.id === deletingId); // variable holds project matching active selected project
  const editingProject = projects.find((p) => p.id === editingId);

  // filter that returns searched projects
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  const navigate = useNavigate()

  return (
    <>
      <h1>Project</h1>
      <div className="my-10 flex-center gap-x-10!">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
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
      </div>

      <p className="font-bold mb-2">
        {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "Project" : "Projects"}
      </p>
      <hr className="mb-5 " />

      {/* Project cards mapped with empty card state */}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-3 gap-5  ">
          {filteredProjects.slice(0, limit).map((project) => {
            const assignees = mockUsers.filter((u) =>
              project.assignedTo?.includes(u.id),
            );
            return (
              <div
                key={project.id}
              onClick={()=>  navigate(`/project/${project.id}`)}
                className="card hover:border-accent2/20 hover:border flex flex-col  rounded-xl px-5! cursor-pointer group "
              >
                <div className="flex justify-between gap-5">
                  <h2 className="mb-2">{project.name} </h2>
                   <div onClick={(e) => e.stopPropagation()}>
                      {user?.role === "ADMIN" || (
                    <PopupMenu>
                      <Link to={`/project/${project.id}`}>
                        <button className="w-full text-left">View</button>
                      </Link>
                      <button
                        onClick={() => setEditingId(project.id)}
                        className="w-full text-left"
                      >
                        Edit
                      </button>

                      <hr className="my-1 " />
                      <button
                        onClick={() => setDeletingId(project.id)}
                        className="w-full text-left hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </PopupMenu>
                  )}
                </div>
               </div>
                <p>{project.description} </p>
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

      {/* Conditonally rendered Modals */}
      {open && (
        <ProjectForm
          title="Add Project"
          onClose={() => setOpen(false)}
          onSubmit={(data) => createProject(data.name, data.description)}
        />
      )}

      {editingProject && (
        <ProjectForm
          key={editingProject.id}
          title="Edit Project"
          onClose={() => setEditingId(null)}
          defaultValues={{
            name: editingProject.name,
            description: editingProject.description,
          }}
          onSubmit={(data) => updateProject(editingProject.id, data)}
        />
      )}

      {deletingProject && (
        <ConfirmModal
          Message={`Are you sure you want to delete "${deletingProject.name}"`}
          onConfirm={() => {
            (deleteProject(deletingProject.id), setDeletingId(null));
          }}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </>
  );
}
