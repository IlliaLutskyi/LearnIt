"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Course } from "../EditForm";
import InputField from "@/components/common/InputField";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Prerequisite } from "@/types/create-course/prerequisites";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
type Props = {
  course: Course;
};
const PrerequisitesTab = ({ course }: Props) => {
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>();
  const router = useRouter();
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await api.patch("/prerequisites", prerequisites);
      return res.data;
    },
    onSuccess: () => {
      router.refresh();
      return toast.success("Prerequisites updated successfully");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/prerequisites/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      if (!prerequisites) return;
      setPrerequisites((prev) =>
        prev!.filter((prerequisite) => prerequisite.id !== id)
      );
      return toast.success("Prerequisite deleted");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  const addMutation = useMutation<{ prerequisite: Prerequisite }>({
    mutationFn: async () => {
      const res = await api.post("/prerequisites", {
        courseId: course.id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (!prerequisites) return;
      setPrerequisites((prev) => [
        ...prev!,
        { id: data.prerequisite.id, content: data.prerequisite.content },
      ]);
      return toast.success("Prerequisite added");
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  useEffect(() => {
    if (!course) return;
    setPrerequisites(course.prerequisites);
  }, [course]);
  function handlePreriquisiteChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) {
    if (!prerequisites) return;
    const newPrerequisites = prerequisites.map((preriquisite) => {
      if (preriquisite.id === id) {
        return { ...preriquisite, content: e.target.value };
      }
      return preriquisite;
    });
    setPrerequisites(newPrerequisites);
  }
  function handleDeletePreriquisite(id: number) {
    deleteMutation.mutate(id);
  }
  function handleAddPreriquisite() {
    addMutation.mutate();
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate();
  }
  return (
    <form
      className="flex flex-col gap-2 h-full"
      method="PATCh"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-center text-lg">Prerequisites</h2>
      <button
        className="self-end bg-purple-500 text-white px-4 py-2 text-sm hover:scale-95 focus:scale-95 rounded-sm hover:bg-purple-600 duration-300"
        onClick={handleAddPreriquisite}
      >
        Add Prerequisite
      </button>
      <div
        className="grow flex flex-col gap-2 overflow-y-scroll h-[20rem]"
        id="styledScrollbar"
      >
        {prerequisites?.length === 0 && (
          <p className="text-center text-xs">No prerequisites</p>
        )}
        {prerequisites &&
          prerequisites.map((preriquisite) => (
            <div key={preriquisite.id} className="grid grid-cols-[4fr_1fr]">
              <InputField
                multiline
                value={preriquisite.content}
                onChange={(e) => handlePreriquisiteChange(e, preriquisite.id)}
                inputClassName="mx-auto w-3/4 outline-0 text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md h-[4rem] resize-none"
              />
              <button
                type="button"
                onClick={() => handleDeletePreriquisite(preriquisite.id)}
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

export default PrerequisitesTab;
