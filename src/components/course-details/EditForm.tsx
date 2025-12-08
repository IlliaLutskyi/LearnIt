"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { memo } from "react";
import { toggleEditCourseDetailForm } from "@/lib/slices/edit-course-detail-form-slice";
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import SkillsTab from "./tabs/SkillsTab";
import PrerequisitesTab from "./tabs/PrerequisitesTab";
import SideBar from "./SideBar";
import { DbCourse } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
type Props = {
  course: DbCourse;
};
const EditForm = ({ course }: Props) => {
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
            <motion.div className="grid grid-cols-[1fr_5fr]">
              <SideBar />

              <section className="flex flex-col gap-4 p-4">
                {currentTab === "general_info" && (
                  <GeneralInfoTab course={course} />
                )}
                {currentTab === "prerequisites" && (
                  <PrerequisitesTab course={course} />
                )}
                {currentTab === "skills" && <SkillsTab course={course} />}
              </section>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(EditForm);
