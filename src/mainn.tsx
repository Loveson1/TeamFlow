/*In summary, when working with react routes, there are core ideas to not forget

1. the react createBrowserRouter([]) - that holds an array of objects
2. the path and element propeeties that receives path with / and component to go to
3. RouterProvider component, which is a built in component that takes router 
    like how value is taken by context

4. In situaton where all your component needs to be displayed by app 
    you can make app the main path with children and index


    so how this works is app wraps all the component
    then we use it in browser router as the main object with children
    we make a page the landing page usimg index true and naviagate to component we want.
    We use replace so the / entry is swapped out of the history stack instead of kept. 
    That way, pressing Back never lands on /, which would just bounce us forward to /project again.
    
*/

import { createBrowserRouter, Link, Navigate, RouterProvider } from "react-router-dom";
import App from "./App";
import Project from "./mainscreens/Project";
import ProjectForm from "./reuseable-components/ProjectForm";
import ProjectTasks from "./mainscreens/ProjectTask";


// the default way of building it when app doesnt wrap all the components

export default function Mainer() {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/project", element: <Project /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


// how we build route when app uses an outlet
// here we dont need to start children path with slash / because App path already defines it 

export function Mainer2() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [{ index: true, element: <Navigate to={"/project"} replace/> },
        {path: "/project", element: <Project/>}
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


// how we use it in components to navigate to pages 

export function Home() {
  return (
    <div>
      <h2>Welcome Home</h2>
      <Link to={"/"}>
        <button>Go back</button>
      </Link>
    </div>
  );
}


// Dynamic rendering we do this by adding a colon :id - we can use other things like projectName, productTag instead of Id
// So a component is to be navigated to, but this same component shows different data
// the  colon : is what makes it dynamic
export function Mainer3() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [{ index: true, element: <Navigate to={"/project"} replace/> },
        {path: "project", element: <Project/>},
        {path: "project/:projectId", element: <ProjectTasks/>}

      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

// Using useparams - 
// useparams returns an object with a key value pair of the dynamic parameter from the current url
// example: {id: pro_123}