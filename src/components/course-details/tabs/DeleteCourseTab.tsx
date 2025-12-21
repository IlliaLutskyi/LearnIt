import api from "@/lib/axios";
import { DbCourse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
type Props = {
  course: DbCourse;
};
const DeleteCourseTab = ({ course }: Props) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/course/${course.id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  async function onSubmit() {
    await mutation.mutateAsync();
  }

  return (
    <form className="flex flex-col gap-2 h-full">
      <div className="grow flex flex-col gap-1 text-center">
        <h1 className="font-bold text-lg">
          Are you sure you want to delete this course
        </h1>

        <p className="text-sm text-muted-foreground">
          This action will permanently delete all data associated with this
          course
        </p>
      </div>

      <button
        onClick={onSubmit}
        className="self-end bg-error text-error-foreground text-sm p-2 rounded-sm hover:scale-95 duration-400"
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteCourseTab;
