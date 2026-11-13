// build a reusable accessible popup menu
// to do this you need export fuction with children
// a usestate to close and open the menu
// useref to trigger focus on it
// interface for the data shape and structure

import { useState, useRef, type ReactNode } from "react";
import { LuEllipsis } from "react-icons/lu";

interface MenuType {
  label?: string;
  children: ReactNode;
}

export default function PopupMenu({ label = "options", children }: MenuType) {
  const [open, setOpen] = useState<boolean>(false);
  const [dropUp, setDropUp] = useState<boolean>(false);


  const focusRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setOpen(false);
    focusRef.current?.focus();
  };

  return (
    <div
      className="relative "
      onKeyDown={(e) => e.key === "Escape" && closeMenu()}
    >
      <button
        aria-expanded={open}
        aria-label={label}
        onClick={(e) =>{
            setDropUp(window.innerHeight - e.clientY < 200)
            setOpen((prev) => !prev)}}
        type="button"
        className={`group-hover:opacity-100 ${open ? "opacity-100" :" opacity-0"}`}
      >
        <LuEllipsis />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10 cursor-auto"
            onClick={() => setOpen(false)}
          />

          <div
            onClick={() => setOpen(false)}
            className={`card right-0 border p-2! border-accent2/20 z-20  rounded-xl absolute w-40 flex flex-col ${dropUp ? "bottom-full mb-2" : "top-full mt-2"}  `}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
