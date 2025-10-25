"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  editSection,
  renameSectionGroup,
} from "@/lib/slices/create-course-slice";
import BlurBackground from "../common/BlurBackground";
import { Section, SectionGroup } from "@/types/create-course";
import z from "zod";
import Input from "../common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const DataSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});
type Data = z.infer<typeof DataSchema>;
type Props = {
  isOpen: boolean;
  section?: Section;
  sectionGroup?: SectionGroup;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RenameForm = ({ isOpen, section, sectionGroup, setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DataSchema),
  });
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      formRef.current &&
      !formRef.current.contains(target) &&
      target.id !== "rename-anchor"
    ) {
      setIsOpen(false);
    }
  }
  function onSubmit(data: Data) {
    if (section) {
      dispatch(
        editSection({
          sectionGroupOrder: section.sectionGroupId,
          title: data.title,
          order: section.order,
        })
      );
    } else if (sectionGroup) {
      dispatch(
        renameSectionGroup({
          title: data.title,
          sectionGroupOrder: sectionGroup.order,
        })
      );
    }
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <>
      <BlurBackground />
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-1/2 left-1/2 w-1/2 translate-x-[-50%] translate-y-[-50%] p-5 flex flex-col gap-2 bg-white shadow-lg rounded-sm"
      >
        <Input
          label="title"
          register={register}
          field="title"
          autoFocus={true}
          defaultValue={section ? section.title : sectionGroup?.title}
          error={errors.title?.message}
          className="w-full text-sm focus:ring-1 focus:ring-purple-500 outline-0 shadow-sm p-2 rounded-md"
        />
        <button className="bg-purple-500 p-2 rounded-md text-sm text-white self-end hover:scale-95 focus:scale-95 duration-400">
          Save
        </button>
      </form>
    </>
  );
};

export default RenameForm;
