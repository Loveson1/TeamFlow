// // // create a reusable form component
// // // then use the form component by say a projectformcomponent.

// import { useForm } from "react-hook-form";
// import FormModal from "./FormModal";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";

// // import type { ReactNode, SubmitEventHandler } from "react";

// // // It needs some props to be passed to the parent where it receiv data what are they?
// // // onsubmit function, oncancel function, a children for the form inputs and a title for form heading

// // // what else does a form need does it need a state?
// // // No sinces, it going to be used else where the state should be with the parent
// // // it need html structure and thats all.

// // interface FormProps {
// //   onSubmit: SubmitEventHandler<HTMLFormElement>;
// //   onClose: () => void;
// //   children: ReactNode;
// //   title: string;
// // }

// // export default function Forms({
// //   children,
// //   onClose,
// //   onSubmit,
// //   title,
// // }: FormProps) {
// //   return (
// //     <div
// //       onClick={onClose}
// //       className="flex fixed inset-0 justify-center items-center z-2  "
// //     >
// //       <div className="z-10 card absolute flex flex-col ">
// //         <div className="flex-center  justify-between">
        
// //           <p>{title}</p> x
// //         </div>

// //         <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit} className="flex flex-col">
// //           {children}
// //           <div>
// //             <button type="submit">save</button>
// //             <button onClick={onClose} type="button">
// //               cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// /*


// To build the form component
// you need to know what data it passes to the form prop - receives onsubmit, cancel and children, title

// what props it passes to parent/ what data it receives from parent - onsubmit, onClose, form values, title

// what form field data it takes

// */




// const  projectSchema = z.object({name: z.string(), description: z.string(), assignedTo: z.union([z.string(), z.array(z.string())]).optional()})


// type formField = z.infer<typeof projectSchema>


// interface ProjectProp{
//     onSubmit: (data: formField)=> void;
//     onClose: ()=> void;
//     title: string;
//     defaultValues?: Partial<formField>
// }

// export default function Projectfom({onSubmit, onClose, title, defaultValues}: ProjectProp){

// const {register, handleSubmit(onSubmit) } = useForm<formField>({resolver: zodResolver(projectSchema)})

// const  onSubmit :

// return(
//     <FormModal onSubmit={onSubmit} onClose={onClose} title={title}>

//         <label  htmlFor="name">Name</label>
//         <input {...register("name")} id="name" placeholder="type project"/>
//         <label htmlFor="name">Name</label>
//         <textarea {...register("description")} id="name" placeholder="type project" rows={10} cols={15}/>



//     </FormModal>

// )
// }
























