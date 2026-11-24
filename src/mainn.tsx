/*In summary, when working with react routes, there are core ideas to not forget

1. the react createBrowserRouter([]) - that holds an array of objects
2. the path and element propeeties that receives path with / and component to go to
3. ReactProvider component, which s a built in component that takes router 
    like how value is taken by context



*/


import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import App from "./App";
import Project from "./mainscreens/Project";


export default function Mainer(){

const router = createBrowserRouter([
 {path: "/", element: <App/>},
 {path: "/project", element: <Project/>},
]
)


return (

    <div>
        <RouterProvider router={router}/>

    </div>
)}



export  function Home(){




return (

    <div>
       <h2>Welcome Home</h2>
       <Link to={"/"}>
       <button>Go back</button>
        </Link>
    </div>
)}

