"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddSectionButton from "@/features/sections/components/create-course-form/AddSectionButton";
import SectionGroups from "@/features/sections/components/create-course-form/SectionGroups";
import { lazy, Suspense, useEffect } from "react";
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
const ConfirmationForm = lazy(
  () => import("../../../../components/common/ConfirmationForm")
);
type Props = {
  step: Step;
};
const Step4 = ({ step }: Props) => {
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
  async function handleCreate() {
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
        <AddSectionButton />
      </section>

      {sectionGroups.length === 0 && (
        <p className="text-center text-sm">No section group</p>
      )}

      <section className="grow">
        <SectionGroups />
      </section>

      <Navigation currentStep={step.step} />

      <Suspense>
        <ConfirmationForm
          onYes={handleCreate}
          warning="Are you sure everything is correct?"
        />
      </Suspense>
    </motion.div>
  );
};

export default Step4;
