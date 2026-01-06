"use client";

import { lazy, Suspense, useRef, useState } from "react";
import Navigation from "./Navigation";
import SetRating from "../../features/ratings/components/SetRating";
import OnThisPageBar from "./OnThisPageBar";
import { useSession } from "next-auth/react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "@/features/lessons/components/Image";
import { DbNextOrPrevSection, DbSection } from "@/types";
import { isAdmin } from "@/features/users/permissions";
import Text from "@/features/lessons/components/Text";
import Video from "@/features/lessons/components/Video";
import Quiz from "@/features/quizzes/components/Quiz";
import HighlightedCode from "@/features/lessons/components/HighlightedCode";
import { useMutation } from "@tanstack/react-query";
import { EditSection } from "@/features/sections/schemas/edit-section-schema";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";

const EditContentForm = lazy(() => import("./EditContentForm"));

type Props = {
  section: DbSection;
  nextSection: DbNextOrPrevSection | null;
  prevSection: DbNextOrPrevSection | null;
};
const Content = ({ section, nextSection, prevSection }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const params = useParams();

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const springProgress = useSpring(scrollYProgress, { stiffness: 100 });

  const saveMutation = useMutation({
    mutationFn: async (data: EditSection) => {
      const res = await api.patch(`/sections/${section.id}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);

      return router.push(
        `/course/${params.courseSlug}/${params.sectionGroupSlug}/${data.sectionSlug}`
      );
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  async function onSave(data: EditSection) {
    await saveMutation.mutateAsync(data);
  }

  return (
    <main>
      <section className="grid grid-cols-1 sm:grid-cols-[4fr_1fr]">
        <div
          ref={containerRef}
          className="grow flex flex-col gap-2 overflow-y-auto sm:h-[calc(100vh-var(--navbar-height))] h-[calc(100vh-var(--navbar-height)-var(--content-navbar-height)-var(--streak-height))]"
          id="scrollbar"
        >
          <motion.div
            className="sm:sticky fixed sm:top-0 top-22 bg-secondary-accent w-full p-1 z-10"
            style={{
              scaleX: springProgress,
              originX: 0,
            }}
          />

          <section className="flex flex-col gap-2 m-4">
            {section.lessons?.map((lesson) => {
              if (lesson.contentType === "Text")
                return <Text key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Video")
                return <Video key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Quiz")
                return <Quiz key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Image")
                return <Image key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "HighlightedCode") {
                return <HighlightedCode key={lesson.id} lesson={lesson} />;
              }
            })}
          </section>

          <section className="flex flex-col gap-2 justify-end mb-4 mx-4">
            <SetRating section={section} />

            <Navigation nextSection={nextSection} prevSection={prevSection} />

            {isAdmin(session?.user) && (
              <button
                onClick={() => setIsEditFormOpen(true)}
                className="self-end text-xs text-accent hover:text-secondary-accent duration-500"
              >
                Edit Page
              </button>
            )}
          </section>
        </div>

        <OnThisPageBar section={section} />
      </section>

      <Suspense>
        <EditContentForm
          section={section}
          isOpen={isEditFormOpen}
          setIsOpen={setIsEditFormOpen}
          onSave={onSave}
        />
      </Suspense>
    </main>
  );
};

export default Content;
