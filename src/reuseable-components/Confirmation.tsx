   
   
interface ConfirmType{
    ConfirmLabel?: string,
    Message: string,
    onConfirm: () => void,
    onCancel:()=>void

} 
   
export default function ConfirmModal({onConfirm, onCancel, Message, ConfirmLabel = "Delete"}: ConfirmType){

    return(
<div className="bg-background/30 inset-0 fixed z-1 flex items-center justify-center ">
          <div className="card p-4! rounded-xl">
            <p className="my-5">
              {Message}
            </p>
            <div className=" flex-center ">
              <button
                className="button2 bg-red-800! hover:bg-red-700!"
                onClick={onConfirm}
              >
                {ConfirmLabel}
              </button>
              <button onClick={onCancel} className="button2">
                Cancel
              </button>
            </div>
          </div>
        </div>
    )
   }
   
   
   