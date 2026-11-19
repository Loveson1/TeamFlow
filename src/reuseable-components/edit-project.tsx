// // create a reusable form component
// // then use the form component by say a projectformcomponent.

// import type { ReactNode, SubmitEventHandler } from "react";

// // It needs some props to be passed to the parent where it receiv data what are they?
// // onsubmit function, oncancel function, a children for the form inputs and a title for form heading

// // what else does a form need does it need a state?
// // No sinces, it going to be used else where the state should be with the parent
// // it need html structure and thats all.

// interface FormProps {
//   onSubmit: SubmitEventHandler<HTMLFormElement>;
//   onClose: () => void;
//   children: ReactNode;
//   title: string;
// }

// export default function Forms({
//   children,
//   onClose,
//   onSubmit,
//   title,
// }: FormProps) {
//   return (
//     <div
//       onClick={onClose}
//       className="flex fixed inset-0 justify-center items-center z-2  "
//     >
//       <div className="z-10 card absolute flex flex-col ">
//         <div className="flex-center  justify-between">
        
//           <p>{title}</p> x
//         </div>

//         <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit} className="flex flex-col">
//           {children}
//           <div>
//             <button type="submit">save</button>
//             <button onClick={onClose} type="button">
//               cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
