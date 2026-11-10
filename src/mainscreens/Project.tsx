/* For the prject screen
what context is needed here, - project context 

what local data - 


empty project state, 

work on this tomorrow
loading project state ,

add project state modal for adding project

load more state

search project, 

project card options, 




architecture

project heading
search and add bar
numbers of project with an horizontal line
project cards 
project cards contains option 
options includes view , edit, assign and delete
the view goes to the project where the tasks are
edit goes to form to edit project
asign assign either you or the unassign people or assign multiple people

*/

import React, { useState } from "react";
import { LuEllipsis, LuPlus } from "react-icons/lu";
import { useProject } from "../context/ProjectContext";

export default function Project() {
  const { projects, createProject, updateProject } = useProject();

  return (
    <>
      <h1>Project</h1>

      <div className="my-10 flex-center gap-x-10!">
        <input
          type="search"
          className="border-secondaryText border rounded p-1.75 w-full"
          placeholder="Search Projects"
        />
        <button className="text-nowrap button2 ">Create Project </button>
      </div>

      <p className="font-bold mb-2">{projects.length} Projects</p>
      <hr className="mb-5 opacity-30" />

      {projects.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 ">
          {projects.map((project) => (
            <div key={project.id} className="card rounded-xl px-5! max-w-80">
              <div className="flex justify-between gap-5">
                <h2 className="mb-2">{project.name} </h2>
                <LuEllipsis /> {/* is it okay to put a onclick event here because im thinkig imagine having 100 projects isnt that 100 events?*/}
              </div>

              <p>{project.description} </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card rounded-xl px-5! max-w-80">
          <h2 className="mb-2"> No Project Yet</h2>

          <div className="flex-center">
            <LuPlus />
            <p>Add New Project</p>
          </div>
        </div>
      )}
      {projects.length >= 6 && (
        <button className="mt-5 button2">Load More</button>
      )}
    </>
  );
}
