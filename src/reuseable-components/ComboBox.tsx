import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxInput,
  ComboboxItem,
} from "../components/ui/combobox";
import  { useState, type ReactNode } from "react";

interface ComboProps{
    children: ReactNode
}

const assignees = ["ade", "olu", "ayo"];

export default function ComboBox({children}:ComboProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [dropUp, setDropUp] = useState<boolean>(false);

  return (
    <>
      <div
      className="relative ">
      <button
        type="button"
        onClick={(e) => {
            e.stopPropagation()
          setDropUp(window.innerHeight - e.clientY < 200);
          setOpen(true);
        
        }}
        className="w-full text-left hover:bg-transparent! p-0!"
      >
        {children}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10 cursor-auto"
            onClick={() => setOpen(false)}
          />
          <div
            className={` bg-background rounded left-0 p-1! z-20   absolute w-50 flex flex-col ${dropUp ? "bottom-full mb-2" : "top-full mt-2"}  `}
            onClick={(e) => e.stopPropagation()}
          
          >
            <Combobox  items={assignees}>
              <ComboboxInput  placeholder="Type an assignee" />
              <ComboboxContent>
                <ComboboxEmpty>
                  <button>Invite to project</button>
                </ComboboxEmpty>
                <ComboboxList>
                  {(assignees).map((a, index) => (
                    <ComboboxItem key={index} value={a}>
                      {a}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </>
      )}
      </div>
    </>
  );
}
