// Learn zod or react hook for this form
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormModal from "./FormModal";
import { LuPlus } from "react-icons/lu";

const ProjectSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(15000),
  assignedTo: z.union([z.array(z.string())]).optional(),
});

type ProjectFields = z.infer<typeof ProjectSchema>;

interface ProjectFormProps {
  title: string;
  defaultValues?: Partial<ProjectFields>;
  onSubmit: (data: ProjectFields) => void;
  onClose: () => void;
}

export default function ProjectForm({
  title,
  defaultValues,
  onSubmit,
  onClose,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFields>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: { name: "", description: "", ...defaultValues },
  });

  return (
    <FormModal
      title={title}
      onClose={onClose}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        onClose();
      })}
    >
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        {...register("name")}
        placeholder="Add name"
        name="name"
        type="text"
        className="border-secondaryText border rounded p-1.5 "
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <label htmlFor="description" className="mt-4 mb-1">
        Description
      </label>
      <textarea
        {...register("description")}
        name="description"
        placeholder="Add a description"
        className="border-secondaryText border rounded p-1.75 mb-2"
        rows={5}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <button
        type="button"
        className="flex-center justify-between group border-secondaryText border rounded my-2 mb-4"
      >
        <p className=" phover">Assignee</p>
        <LuPlus className="size-5" />
      </button>

      <div className="flex-center mb-5 ">
        <div className="size-5 bg-purple rounded-full font-bold text-white flex items-center justify-center">
          A
        </div>
        <p> Adeola Omomowo</p>
      </div>
    </FormModal>
  );
}
