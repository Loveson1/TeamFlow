import { type ReactNode, type SubmitEventHandler } from "react";
import { LuX, } from "react-icons/lu";




interface FormModalProps {
  title: string,
  onSubmit: SubmitEventHandler<HTMLFormElement>
  children: ReactNode;
  onClose: () => void;
  isSubmitting?: boolean

}

export default function FormModal({ children, onClose, title, onSubmit, isSubmitting }: FormModalProps) {



 

  return (
    <>
      <div
        onClick={onClose}
        className="bg-background/30 inset-0 fixed z-1 flex items-center justify-center "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="card p-4! w-1/3 z-20 rounded-xl absolute "
        >
          <div className="flex-center justify-between ">
            <p className="font-bold">{title}</p>
            <button type="button" onClick={onClose}>
              <LuX className="size-5" />
            </button>
          </div>
          <hr className="" />

          <form
            className="flex flex-col mt-6"
            onSubmit={onSubmit}
          >
            
            {children}
            <div className="flex-center ">
              <button  type="submit" className="button2 w-20">
                Save
              </button>
              <button type="button" onClick={onClose} className="button3 w-20">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
