// /*

// what context uses the sidebar
// what will be a local data
// HOW WILL I implement it such that the system setting remain hidden to worker
// what will the achitecture be like

// it will use theme and auth context for theme changing and to know which user is active

// to make setting hidden to worker, i will ask what role is currently logged in then condiotionally
// use that to shw or hide the code although idont now how i will do this clearly yet.

// local data
// i dont qite get this part

// the arctecture is such that
// it will contain User icon then a teme swicher button and an expand restract button,
// then an add task button button
// then a search button
// then a project button
// then a seting button for admin only
// and fially a logout button

// */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import {
  LuFolder,
  LuSettings,
  LuLogOut,
  LuSearch,
  LuCirclePlus,
  LuSunMoon,
  LuPanelLeftClose,
} from "react-icons/lu";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { projects } = useProject();
  const { toggleTheme } = useTheme();

  return (
    <div className=" w-64 min-h-screen flex flex-col card">
      <div className="flex  items-center justify-between ">
        <div className="flex-center px-2 ">
          <div className="size-7 bg-purple rounded-full font-bold text-white flex items-center justify-center">{user?.name.charAt(0)}A</div>
          <p>{user?.name} Adeola</p>
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={toggleTheme}>
            <LuSunMoon className="size-5" />
          </button>
          <button>
            <LuPanelLeftClose className="size-5" />
          </button>
        </div>
      </div>

      <nav className="mt-5">
        <button className="flex-center  group">
          <LuCirclePlus className="size-5 group-hover:text-accent " />
          <p className="group-hover:text-accent ">Add Task</p>
        </button>

        <button className="flex-center">
          <LuSearch className="size-5" />
        Search
        </button>

        <button className="flex-center">
          <LuFolder className="size-5" />
          Projects
        </button>

        {user?.role === "ADMIN" && (
          <button>
            <LuSettings className="size-5" /> System settings
          </button>
        )}
      </nav>

      <div className="mt-auto w-full">
        <button onClick={logout} className="flex-center">
          <LuLogOut className="size-5" />
          logout
        </button>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";
// import { useProject } from "../context/ProjectContext";

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const { projects } = useProject();
//   const { theme, toggleTheme } = useTheme();

//   // 🗺️ Layout Local States
//   const [isExpanded, setIsExpanded] = useState<boolean>(true);
//   const [showProjectsList, setShowProjectsList] = useState<boolean>(false);

//   return (
//     <div className={`min-h-screen bg-card-background text-text p-4 flex flex-col justify-between border-r border-accent transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>

//       {/* 🔝 TOP SECTION: Branding & Core Utility Controls */}
//       <div className="flex flex-col gap-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center font-bold text-white">
//               {user?.name.charAt(0)}
//             </div>
//             {isExpanded && <p className="font-sans font-bold">{user?.name}</p>}
//           </div>

//           {/* Toggle Expansion State */}
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-1 hover:bg-background rounded text-secondary-text"
//           >
//             {isExpanded ? "◁" : "▷"}
//           </button>
//         </div>

//         {/* Theme Switching Trigger */}
//         <button
//           onClick={toggleTheme}
//           className="flex items-center gap-3 p-2 hover:bg-background rounded w-full text-left"
//         >
//           <span>🌓</span>
//           {isExpanded && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
//         </button>

//         {/* 🎛️ CORE NAVIGATION ACTIONS */}
//         <nav className="flex flex-col gap-2">
//           <button className="flex items-center gap-3 p-2 hover:bg-background rounded w-full text-left text-purple font-semibold">
//             <span>➕</span>
//             {isExpanded && <p>Add Task</p>}
//           </button>

//           <button className="flex items-center gap-3 p-2 hover:bg-background rounded w-full text-left">
//             <span>🔍</span>
//             {isExpanded && <p>Search</p>}
//           </button>

//           {/* 📁 PROJECT LIST DROPDOWN ENGINE */}
//           <div className="flex flex-col">
//             <button
//               onClick={() => setShowProjectsList(!showProjectsList)}
//               className="flex items-center justify-between p-2 hover:bg-background rounded w-full text-left"
//             >
//               <div className="flex items-center gap-3">
//                 <span>📁</span>
//                 {isExpanded && <p>Projects</p>}
//               </div>
//               {isExpanded && (<span>{showProjectsList ? "▾" : "▸"}</span>)}
//             </button>

//             {/* Render sub-list container only if expanded and opened */}
//             {showProjectsList && isExpanded && (
//               <div className="pl-8 mt-1 flex flex-col gap-1 border-l border-accent">
//                 {projects.map((project) => (
//                   <div key={project.id} className="p-1 text-sm text-secondary-text hover:text-text cursor-pointer truncate">
//                     {project.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>

//       {/* 📥 BOTTOM SECTION: Permissions & Session Management */}
//       <div className="flex flex-col gap-2">
//         {user?.role === "ADMIN" && (
//           <button className="flex items-center gap-3 p-2 hover:bg-background rounded w-full text-left text-orange-400">
//             <span>⚙️</span>
//             {isExpanded && <span>System Settings</span>}
//           </button>
//         )}

//         <button
//           onClick={logout}
//           className="flex items-center gap-3 p-2 hover:bg-red-500/10 text-red-400 rounded w-full text-left"
//         >
//           <span>🚪</span>
//           {isExpanded && <span>Logout</span>}
//         </button>
//       </div>

//     </div>
//   );
// }
