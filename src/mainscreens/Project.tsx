/* For the prject screen
what context is needed here, - project context 

what local data - search project, project card options, empty project state, loading project state , add project state modal

what if project where to be empty?



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


import React , {useState} from "react"
import { LuOption } from "react-icons/lu"
import { useProject } from "../context/ProjectContext"

export default function Project(){

    const {projects, createProject, updateProject} = useProject();

    return(
        <>
            <h1>Project</h1>

            <div>
                <input type="search" />
                <button>Create Project </button>
            </div>

            <p>{projects.length}projects</p>
            <hr />
            <div>
                <div className="card">
                    <div>
                     <h2> Go to school</h2>
                    <LuOption/>
                    </div>
                    
                    <p>Going to school is very important</p>
                </div>
            </div>
            <button>Load More</button>

        </>

    )
}