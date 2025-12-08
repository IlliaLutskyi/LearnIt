"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionGroupButton from "@/features/sections/components/create-course-form/AddSectionButton";
import SectionGroups from "@/features/sections/components/create-course-form/SectionGroups";
import { lazy, Suspense, useEffect, useState } from "react";
import SaveContentButton from "@/features/sections/components/create-course-form/SaveContentButton";
import { loadContent } from "@/lib/slices/create-course-slice";
import { Step } from "@/types/create-course";
import Navigation from "./Navigation";
import { fadeInVariants } from "@/features/animations/fade-in";
import { motion } from "framer-motion";
import {
  setIsLoading,
  toggleConfirmationForm,
} from "@/lib/slices/confirmation-form-slice";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
const Preview = lazy(() => import("./Preview"));

type Props = {
  step: Step;
};
const Step4 = ({ step }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const {
    sectionGroups,
    category,
    description,
    prerequisites,
    skills,
    slug,
    title,
  } = useAppSelector((state) => state.CreateCourse);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  console.log(sectionGroups);
  async function handleSave() {
    dispatch(setIsLoading(true));
    dispatch(toggleConfirmationForm(false));
    try {
      const course = {
        title,
        description,
        slug,
        category: {
          id: category,
        },
        userId: session?.user.id,
        skills,
        prerequisites,
        sectionGroups,
      };
      const res = await api.post("/courses", course, {
        withCredentials: true,
      });
      toast.success(res.data.message, { duration: 5000 });
    } catch (err) {
      if (isAxiosError(err))
        return toast.error(err.response?.data.message, { duration: 3000 });
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    dispatch(loadContent());
  }, []);
  return (
    <motion.div
      className="flex flex-col gap-2 p-4 h-full"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-lg font-bold self-center">{step.title}</h1>
      <section className="flex gap-4 items-center justify-between">
        <SaveContentButton />
        <AddSectionGroupButton />
      </section>

      <section className="grow">
        {sectionGroups.length === 0 && (
          <p className="text-center text-sm">No section group</p>
        )}
        <SectionGroups />
      </section>

      <Navigation currentStep={step.step} setIsPreviewOpen={setIsPreviewOpen} />

      <Suspense>
        <Preview
          isOpen={isPreviewOpen}
          setIsOpen={setIsPreviewOpen}
          onSave={handleSave}
        />
      </Suspense>
    </motion.div>
  );
};

export default Step4;
