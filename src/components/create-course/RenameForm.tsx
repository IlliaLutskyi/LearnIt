"use client";
import { useEffect, useRef, useState } from "react";
import InputField from "../common/InputField";
import { useAppDispatch } from "@/lib/hooks";
import {
  editSection,
  renameSectionGroup,
} from "@/lib/slices/CreateCourseSlice";
import BlurBackground from "../common/BlurBackground";
import { Section } from "@/types/section";
import { SectionGroup } from "@/types/sectionGroup";

type Props = {
  isOpen: boolean;
  section?: Section;
  sectionGroup?: SectionGroup;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RenameForm = ({ isOpen, section, sectionGroup, setIsOpen }: Props) => {
  const [title, setTitle] = useState("");
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
  function onSubmit() {
    if (!title && title.length >= 30) return;
    if (section) {
      dispatch(
        editSection({
          sectionGroupOrder: section.sectionGroupId,
          title,
          order: section.order,
        })
      );
    } else if (sectionGroup) {
      dispatch(
        renameSectionGroup({ title, sectionGroupOrder: sectionGroup.order })
      );
    }
    setIsOpen(false);
  }
  return (
    <>
      {isOpen && (
        <>
          <BlurBackground />
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="absolute top-1/2 left-1/2 w-1/2 translate-x-[-50%] translate-y-[-50%] p-5 flex flex-col gap-2 bg-white shadow-lg rounded-md"
            method="POST"
          >
            <InputField
              label="title"
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              defaultValue={section ? section.title : sectionGroup?.title}
              inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md "
            />
            <button
              type="submit"
              className="bg-purple-500 p-2 rounded-md text-sm text-white self-end"
            >
              Save
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default RenameForm;
