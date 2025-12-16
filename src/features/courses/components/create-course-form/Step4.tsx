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
import { setIsLoading } from "@/lib/slices/confirmation-form-slice";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { CreateCourse } from "../../schemas/create-course-schema";
const Preview = lazy(() => import("./preview/Preview"));

type Props = {
  step: Step;
};
const Step4 = ({ step }: Props) => {
  const dispatch = useAppDispatch();

  const createCourseMutation = useMutation({
    mutationFn: async (data: CreateCourse) => {
      const res = await api.post("/courses", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
    onSettled: () => {
      dispatch(setIsLoading(false));
    },
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    sectionGroups,
    category,
    description,
    prerequisites,
    skills,
    poster,
    slug,
    title,
  } = useAppSelector((state) => state.CreateCourse);

  async function onSave() {
    dispatch(setIsLoading(true));

    const course = {
      poster,
      title,
      slug,
      description,
      category: {
        id: category,
      },
      prerequisites,
      sectionGroups,
      skills,
    };

    await createCourseMutation.mutateAsync(course);
  }

  useEffect(() => {
    dispatch(loadContent());
  }, [dispatch]);

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
          onSave={onSave}
        />
      </Suspense>
    </motion.div>
  );
};

export default Step4;
