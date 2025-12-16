"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { lazy, memo, Suspense } from "react";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";

import SideBar from "./SideBar";
import { DbCourse } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Loader } from "../common";

const GeneralInfoTab = lazy(() => import("./tabs/GeneralInfoTab"));
const PrerequisitesTab = lazy(() => import("./tabs/PrerequisitesTab"));
const SkillsTab = lazy(() => import("./tabs/SkillsTab"));

type Props = {
  course: DbCourse;
};
const EditCourseDetailForm = ({ course }: Props) => {
  const { currentTab, isOpen } = useAppSelector(
    (store) => store.EditCourseDetail
  );
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => dispatch(toggleEditCourseDetailForm(open))}
        >
          <DialogContent className="w-5/6" showCloseButton={false}>
            <div className="grid grid-cols-[1fr_5fr]">
              <DialogTitle className="hidden">Edit Course Details</DialogTitle>

              <SideBar />

              <Suspense fallback={<Loader />}>
                <section className="flex flex-col gap-4 p-4">
                  {currentTab === "general_info" && (
                    <GeneralInfoTab course={course} />
                  )}
                  {currentTab === "prerequisites" && (
                    <PrerequisitesTab course={course} />
                  )}
                  {currentTab === "skills" && <SkillsTab course={course} />}
                </section>
              </Suspense>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(EditCourseDetailForm);
