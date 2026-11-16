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
import PopupMenu from "../components/PopupMenu";
import AddForm from "../components/FormModal";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/ProjectForm";

export default function Project() {
  // Global state
  const { projects, deleteProject, createProject, updateProject  } = useProject();
  const {user} = useAuth()
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

  return (
    <>
      <h1>Project</h1>

     <div className="my-10 flex-center gap-x-10!">
        <input
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value), setLimit(PAGE_SIZE)}}
          type="search"
          className="border-secondaryText border rounded p-1.75 w-full"
          placeholder="Search Projects"
        />
    {user?.role === "ADMIN" ||    <button onClick={()=> setOpen(prev => (!prev))} className=" flex-center text-nowrap button2 ">
          <LuPlus />
          Create Project{" "}
        </button>}

      {open &&
      
      <ProjectForm
        title="Add"
        onClose={()=>setOpen(false)}
        onSubmit={(data)=> createProject(data.name, data.description)}
        
        />}
      </div>

      <p className="font-bold mb-2">{filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects" } </p>
      <hr className="mb-5 opacity-30" />

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-3 gap-5  ">
          {filteredProjects.slice(0, limit).map((project, index) => (
            <div
              key={project.id}
              tabIndex={-1}
              ref={limit > PAGE_SIZE && index === limit - PAGE_SIZE  ? focusOnMount : null}
              className="card hover:border-accent2/20 hover:border  rounded-xl px-5! cursor-pointer group "
              onClick={() => useProject}
            >
              <div className="flex justify-between gap-5">
                <h2 className="mb-2">{project.name} </h2>
             {user?.role === "ADMIN" || <PopupMenu>
                  <button className="w-full text-left">View</button>
                  <button onClick={()=>setOpen(prev=>(!prev))} className="w-full text-left">Edit</button>

                   {open &&
      
      <ProjectForm
        title="Edit"
        onClose={()=>setOpen(prev=>(!prev))}
        onSubmit={(data)=> updateProject(data.id, data)}
        
        />}
                  <button className="w-full text-left">Assign</button>

                  <hr className="my-1 opacity-30" />
                  <button onClick={()=>deleteProject(project.id)} className="w-full text-left hover:bg-red-800">
                    Delete
                  </button>
                </PopupMenu>}
              </div>

              <p>{project.description} </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card rounded-xl px-5! ">
         {user?.role === "ADMIN" ?  <h2 className="mb-2"> No Project Yet</h2>: <p className="mb-2"> You've not been assigned any project yet!</p>}

          {user?.role === "ADMIN" &&   <div>
          <button className="flex-center px-4 m-auto">
              <LuPlus /> Add New Project
            </button>
          </div> }
        </div>
      )}
      {filteredProjects.length > limit && (
        <button
          className="mt-5 button2"
          onClick={() => setLimit(prev => prev + 6)}>
          Load More
        </button>
      )}
    </>
  );
}
