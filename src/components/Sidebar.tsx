// /*

// what context uses the sidebar
// what will be a local data
// HOW WILL I implement it such that the system setting remain hidden to worker
// what will the achitecture be like

// it will use theme and auth context for theme changing and to know which user is active

// to make setting hidden to worker, i will ask what role is currently logged in then condiotionally
// use that to shw or hide the code although idont now how i will do this clearly yet.

// local data
// the local data state are
// the expand state and the project list state

// the arctecture is such that
// it will contain User icon then a teme swicher button and an expand restract button,
// then an add task button button
// then a search button
// then a project button
// then a seting button for admin only
// and finally a logout button

// */

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import {
  LuFolder,
  LuSettings,
  LuLogOut,
  LuSearch,
  LuCirclePlus,
  LuSun,
  LuMoon,
  LuPanelLeftClose,
  LuPanelRightClose,
  LuChevronRight,
  LuChevronDown,
} from "react-icons/lu";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { projects } = useProject();
  const { theme, toggleTheme } = useTheme();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showProjectsList, setShowProjectsList] = useState<boolean>(false);

  const expand = isExpanded ? "w-full" : "w-max";

  return (
    <div
      className={`min-h-screen flex flex-col card transition-all duration-200 ${isExpanded ? "w-64 " : "w-16"}`}
    >
      <div className="flex  items-center justify-between  ">
        {isExpanded && (
          <div className="flex-center px-2 ">
            <div className="size-7 bg-purple rounded-full font-bold text-white flex items-center justify-center">
              {user?.name.charAt(0)}A
            </div>
            <p>{user?.name} Adeola</p>
          </div>
        )}

        <div className="flex gap-2 items-center">
          {isExpanded && (
            <button onClick={toggleTheme}>
              {theme === "light" ? (
                <LuMoon className="size-5" />
              ) : (
                <LuSun className="size-5" />
              )}
            </button>
          )}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <LuPanelLeftClose className="size-5" />
            ) : (
              <LuPanelRightClose className="size-5" />
            )}
          </button>
        </div>
      </div>

      <nav className="mt-5 flex flex-col gap-y-2">
        <button className={`flex-center group ${expand}`}>
          <LuCirclePlus className="size-5 group-hover:text-accent" />
          {isExpanded && <p className="group-hover:text-accent">Add Task</p>}
        </button>

        <button className={`flex-center group ${expand} `}>
          <LuSearch className="size-5 group-hover:text-accent" />
          {isExpanded && <p className="">Search</p>}
        </button>


       {/* PROJECT LIST DROPDOWN ENGINE */}
        <button className={`flex-center justify-between group h-10 ${expand}`}>
          <div className="flex-center ">
            <LuFolder className="size-5 group-hover:text-accent" />
            {isExpanded && <p>Projects</p>}
          </div>
          {isExpanded && (
            <div
              onClick={() => setShowProjectsList(!showProjectsList)}
              className=" hover:bg-purple-800 rounded p-1"
            >
              {showProjectsList ? (
                <LuChevronDown className="size-5  " />
              ) : (
                <LuChevronRight className="size-5" />
              )}
            </div>
          )}
        </button>

        {showProjectsList && isExpanded && (
          <div>
            {projects.map((project) => (
              <button className="flex w-full" key={project.id}>
                <p># {project.name}</p>
              </button>
            ))}
          </div>
        )}

        {user?.role === "ADMIN" && (
          <button className={`flex-center group ${expand}`}>
            <LuSettings className="size-5 group-hover:text-accent" />
            {isExpanded && <p>System settings</p>}
          </button>
        )}
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className={`flex-center hover:bg-red-900 group ${isExpanded ? "w-full" : ""}`}
        >
          <LuLogOut className="size-5 group-hover:text-accent" />
          {isExpanded && <p>logout</p>}
        </button>
      </div>
    </div>
  );
}

// So amigo im done building it i spent 6hours on building this alone , im really concerned abut my slowness although i learnt so much building this

// Learnt how to use the expand
// learnt how to use boolean to show or hide something
// learnt how to hide the text only and how to group hover for button text and icon
// but i was slow spent 3 days on this 2 hours daily we need to adjust going forward
// also i noticed when i change react icons
// also i noticed when i change react icons spelling, the whole app triggers why is that
// also i noticed i repeated several codes here which i believ theres a way i can optimize the code more to follow dry principle
