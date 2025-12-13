"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense, useRef, useState } from "react";
import Navigation from "./Navigation";
import SetRating from "../../features/ratings/components/SetRating";
import { useParams } from "next/navigation";
import OnThisPageBar from "./OnThisPageBar";
import { useSession } from "next-auth/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { getSection } from "@/features/sections/services/get-section";
import Image from "@/features/lessons/components/Image";
const HighlightedCode = lazy(
  () => import("@/features/lessons/components/HighlightedCode")
);
const EditContentForm = lazy(() => import("./EditContentForm"));
const Video = lazy(() => import("@/features/lessons/components/Video"));
const Text = lazy(() => import("@/features/lessons/components/Text"));
const Quiz = lazy(() => import("@/features/quizzes/components/Quiz"));

const Content = () => {
  const params = useParams();
  const { data: session } = useSession();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["section", params.sectionSlug],
    queryFn: () =>
      getSection(params.courseSlug as string, params.sectionSlug as string),
    enabled: !!params.sectionSlug,
  });

  const isContentLoaded = isSuccess && !isPending;

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const clampedProgress = useTransform(scrollYProgress, (v) => Math.min(v, 1));
  const springProgress = useSpring(clampedProgress);

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-[4fr_1fr]">
        <section
          ref={containerRef}
          className="grow flex flex-col gap-2 sm:overflow-y-auto sm:h-[calc(100vh-48px)]"
          id="scrollbar"
        >
          {isContentLoaded && (
            <motion.div
              className="sm:sticky fixed sm:top-0 top-10 bg-pink-400 w-full p-1 z-10"
              style={{
                scaleX: springProgress,
                originX: 0,
              }}
            />
          )}

          {isPending && <Loader />}

          {isContentLoaded && (
            <Suspense fallback={<Loader />}>
              <section className="mt-4 mx-2">
                {data.section.lessons?.map((lesson) => {
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
            </Suspense>
          )}

          {isContentLoaded && (
            <section className="flex flex-col gap-2 justify-end mb-4 mx-4">
              <SetRating sectionId={data.section.id} />

              <Navigation
                nextSection={data.nextSection}
                prevSection={data.prevSection}
              />

              {session?.user && session.user.role === "Admin" && (
                <button
                  onClick={() => setIsEditFormOpen(true)}
                  className="self-end text-xs text-accent hover:text-secondary-accent duration-500"
                >
                  Edit Page
                </button>
              )}
            </section>
          )}
        </section>

        {isContentLoaded && <OnThisPageBar section={data.section} />}
      </div>

      {isSuccess && (
        <Suspense>
          <EditContentForm
            section={data.section}
            isOpen={isEditFormOpen}
            setIsOpen={setIsEditFormOpen}
          />
        </Suspense>
      )}
    </main>
  );
};

export default Content;
