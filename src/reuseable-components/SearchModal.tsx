/*

1 first the architecture

/



navigation array (go home, open project, go to setting )

create array (add project )


then with a search you can show
all this items
plus any project or any task - the task shows the project its under and who its assigned to/unassigned

/


2 How do we get the project and task 
A global context of project / task  that returns the list in them 

it returns the data as a list in the card undernealth

3 local state

which means a local state that manages the rerendering 
and a navigation wired to what is returned with a dynamic identifier for the navigate to
so when its clicked it goes there to the item


4 empty load state 



i have one queston is there a special modal like combobox or something that can be used for this

or should i just create a card with the search above and the naviation below then it dynamicay shows search when i search





for pass 3 or later feature

add task
recent files both added to the modal
*/

/*

Build order, one testable step each
1 Write the single item shape, and a hardcoded array of three rows. Render them in a plain list.
2 Add query state and the filter, and check that typing narrows the list.
3 Add projects and tasks from the contexts into the list, with the 
  task’s project name and assignee derived from the ids.
4 Make clicking a row navigate.
5 Put it in a modal, with open state and a button to open it.
6 Add the empty states.


*/
import { useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { useTask } from "@/context/TaskContext";
import type { ReactNode } from "react";
import {
  LuHouse,
  LuSettings,
  LuPlus,
  LuFolder,
  LuCircle,
} from "react-icons/lu";


interface PaletteItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
}

interface PaletteSection {
  heading: string;
  items: PaletteItem[];
}

const navItem: PaletteItem[] = [
  { id: "go-home", label: "Go home", icon: <LuHouse /> },
  { id: "open-project", label: "Open project", icon: <LuFolder /> },
  { id: "go-setting", label: "Setting", icon: <LuSettings /> },
];

const createAction: PaletteItem[] = [
  { id: "add-project", label: "Add Project", icon: <LuPlus /> },
];

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const hasQuery = q.length > 0

  const { projects } = useProject();
  const { tasks } = useTask();
  const matches = (text: string) => text.toLowerCase().includes(q);

  const projectItems: PaletteItem[] = projects
    .filter((p) => hasQuery && matches(p.name))
    .map((p) => {
      return { id: p.id, label: p.name, icon: <LuFolder /> };
    });

  const taskItems: PaletteItem[] = tasks
    .filter((t) => hasQuery && matches(t.name))
    .map((t) => {
      return {
        id: t.id,
        label: t.name,
        subtitle: t.projectId,
        icon: <LuCircle />,
      };
    });

  const sections: PaletteSection[] = [
    { heading: "Navigations", items: navItem.filter((i) => matches(i.label)) },
    { heading: "Create", items: createAction.filter((i) => matches(i.label)) },
    { heading: "Projects", items: projectItems },
    { heading: "Tasks", items: taskItems },
  ].filter(s => s.items.length > 0)

  return (
    <div className="card rounded-xl p-4!">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border-secondaryText border rounded p-1.5 w-full"
      />

      {sections.length > 0 ? (
        sections.map((s) => (
          <div key={s.heading}>
            <p>{s.heading}</p>

            <ul>
              {s.items.map((item) => (
                <li key={item.id} className="flex-center justify-between">
                  <div className="flex-center justify-between">
                    <div>{item.icon}</div>
                    <p>{item.label}</p>
                  </div>

                  {item.subtitle && <p>{item.subtitle}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No results for your "{query}"</p>
      )}
    </div>
  );
}
