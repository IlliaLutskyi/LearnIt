"use client";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DbCourse } from "@/types";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import { useAppDispatch } from "@/lib/hooks";
import Skill from "@/features/skills/components/create-course-form/Skill";
import {
  CreateSkills,
  CreateSkillsSchema,
} from "@/features/skills/schemas/create-skills-schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {
  course: DbCourse;
};
const SkillsTab = ({ course }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateSkillsSchema),
    defaultValues: {
      skills: course.skills || [],
    },
  });
  const {
    fields: skills,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const updateMustation = useMutation({
    mutationFn: async (data: CreateSkills) => {
      const res = await api.patch(
        "/skills",
        data.skills.map((s) => ({ ...s, courseId: course.id }))
      );
      return res.data;
    },
    onSuccess: () => {
      router.refresh();
      return toast.success("Skills updated successfully");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  function onSubmit(data: CreateSkills) {
    updateMustation.mutate(data);
    dispatch(toggleEditCourseDetailForm());
  }
  return (
    <form
      className="flex flex-col gap-2 h-full"
      method="PATCH"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-center text-lg">Learning Outcomes</h1>

      <button
        type="button"
        className="self-end bg-accent text-accent-foreground px-4 py-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
        onClick={() => append({ content: "" })}
      >
        Add Skill
      </button>

      <div
        className="grow flex flex-col gap-2 overflow-y-auto h-[20rem] py-4"
        id="styledScrollbar"
      >
        {skills.length === 0 && (
          <p className="text-center text-xs">No skills</p>
        )}
        {skills.map((skill, index) => (
          <Skill
            key={skill.id}
            index={index}
            register={register}
            error={errors.skills?.[index]?.content?.message}
            remove={remove}
          />
        ))}
      </div>
      <button
        type="submit"
        className="self-end bg-accent text-accent-foreground p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm duration-400"
      >
        Save
      </button>
    </form>
  );
};

export default SkillsTab;
