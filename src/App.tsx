import "./App.css";

import Sidebar from "./reuseable-components/Sidebar.tsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
  
            <div className="flex min-h-screen bg-background text-text ">
              <Sidebar />

              <main className="flex-1 p-6 ">
                <Outlet/>
              </main>
            </div>
         
  );
}

export default App;
