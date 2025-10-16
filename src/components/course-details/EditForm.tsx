"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { memo, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import BlurBackground from "../common/BlurBackground";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import SkillsTab from "./tabs/SkillsTab";
import PrerequisitesTab from "./tabs/PrerequisitesTab";
import SideBar from "./SideBar";
import { DbCourse } from "@/types";

type Props = {
  course: DbCourse;
};
const EditForm = ({ course }: Props) => {
  const formRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const { currentTab, isOpen } = useAppSelector(
    (store) => store.EditCourseDetail
  );
  const dispatch = useAppDispatch();
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id === "edit_form_anchor") return;
    if (formRef.current && !formRef.current.contains(target)) {
      dispatch(toggleEditCourseDetailForm(false));
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!session || status !== "authenticated" || !isOpen) return null;

  return (
    <>
      <BlurBackground />
      <div
        ref={formRef}
        className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 grid grid-cols-[1fr_5fr] w-5/6 min-h-[500px] bg-white rounded-sm shadow-2xl z-50 "
      >
        <SideBar />
        <section className="flex flex-col gap-4 p-4">
          {currentTab === "general_info" && <GeneralInfoTab course={course} />}
          {currentTab === "prerequisites" && (
            <PrerequisitesTab course={course} />
          )}
          {currentTab === "skills" && <SkillsTab course={course} />}
        </section>
      </div>
    </>
  );
};

export default memo(EditForm);
