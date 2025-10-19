"use client";
import { ChangeEvent, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { DbCourse, DbSkill } from "@/types";
import Input from "@/components/common/Input";

type Props = {
  course: DbCourse;
};
const SkillsTab = ({ course }: Props) => {
  const [skills, setSkills] = useState<DbSkill[]>();
  const router = useRouter();
  const updateMustation = useMutation({
    mutationFn: async () => {
      const res = await api.patch("/skills", skills);
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
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/skills/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      if (!skills) return;
      setSkills((prev) => prev!.filter((skill) => skill.id !== id));
      return toast.success("Skill deleted");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/skills", {
        courseId: course.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (!skills) return;
      return setSkills((prev) => [
        ...prev!,
        { id: data.skill.id, content: data.skill.content },
      ]);
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  useEffect(() => {
    if (!course) return;
    setSkills(course.skills);
  }, [course]);
  function handleDeleteSkill(id: number) {
    deleteMutation.mutate(id);
  }

  function handleAddSkill() {
    addMutation.mutate();
  }

  function handleSkillChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) {
    if (!skills) return;
    const newSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, content: e.target.value };
      }
      return skill;
    });
    setSkills(newSkills);
  }
  function handleSkillSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMustation.mutate();
  }
  return (
    <form
      className="flex flex-col gap-2 h-full"
      method="PATCH"
      onSubmit={handleSkillSubmit}
    >
      <h2 className="font-bold text-center text-lg">Learning Outcomes</h2>
      <button
        className="self-end bg-purple-500 text-white px-4 py-2 text-sm hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-600 duration-300"
        onClick={handleAddSkill}
      >
        Add Skill
      </button>

      <div
        className="grow flex flex-col gap-2 overflow-y-auto h-[20rem] p-2"
        id="styledScrollbar"
      >
        {skills?.length === 0 && (
          <p className="text-center text-xs">No skills</p>
        )}
        {skills &&
          skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-[5fr_1fr]">
              <Input
                multiline
                value={skill.content}
                onChange={(e) => handleSkillChange(e, skill.id)}
                className="mx-auto w-3/4 outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[4rem] resize-none"
              />
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill.id)}
                className="text-red-500 m-auto text-lg"
              >
                <MdDelete />
              </button>
            </div>
          ))}
      </div>
      <button
        type="submit"
        className="self-end bg-purple-500 text-white p-2 text-sm hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-600 duration-300"
      >
        Save
      </button>
    </form>
  );
};

export default SkillsTab;
