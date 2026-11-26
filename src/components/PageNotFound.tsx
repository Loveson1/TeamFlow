import { LuCircleAlert,  } from "react-icons/lu"
import { Link } from "react-router-dom"

export default function PageNotFound(){

    return(
        <div className="flex justify-center items-center min-h-screen">
        <div className="card p-10 rounded-xl flex gap-y-4 flex-col">
            <LuCircleAlert className="size-20"/>
            
           <p>Hey, the page you are looking for does not exist. </p> 
           <Link to={"/project"}> 
           <button className="button2">Go Back</button>
            </Link>
        </div></div>
    )
}

