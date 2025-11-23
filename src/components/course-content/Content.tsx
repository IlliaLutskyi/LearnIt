"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense, useRef } from "react";
import Navigation from "./Navigation";
import SetRating from "../../features/ratings/components/SetRating";
import { useParams } from "next/navigation";
import OnThisPageBar from "./OnThisPageBar";
import { useSession } from "next-auth/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSection } from "@/features/sections/services/get-section";

const EditButton = lazy(() => import("./EditButton"));
const EditContentForm = lazy(() => import("./EditContentForm"));
const Video = lazy(() => import("@/features/lessons/components/Video"));
const Text = lazy(() => import("@/features/lessons/components/Text"));
const Quiz = lazy(() => import("@/features/quizzes/components/Quiz"));

const Content = () => {
  const params = useParams();
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const clampedProgress = useTransform(scrollYProgress, (v) => Math.min(v, 1));
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["section", params.sectionSlug],
    queryFn: () =>
      getSection(params.courseSlug as string, params.sectionSlug as string),
    enabled: !!params.sectionSlug,
  });
  const isContentLoaded = isSuccess && !isPending;

  return (
    <>
      <div className="grid max-md:grid-cols-1 grid-cols-[4fr_1fr]">
        <div
          ref={containerRef}
          className="relative grow flex flex-col gap-1 overflow-y-auto h-[90.5vh] max-sm:h-full"
          id="styledScrollbar"
        >
          {isContentLoaded && (
            <motion.div
              className="sticky top-0 bg-pink-400 p-1"
              style={{
                scaleX: clampedProgress,
                originX: 0,
              }}
            />
          )}

          {isPending && <Loader />}

          {isContentLoaded && (
            <Suspense fallback={<Loader />}>
              <section className="mt-4 mx-4">
                {data.section.lessons?.map((lesson) => {
                  if (lesson.contentType === "Text")
                    return <Text key={lesson.id} lesson={lesson} />;
                  if (lesson.contentType === "Video")
                    return <Video key={lesson.id} lesson={lesson} />;
                  if (lesson.contentType === "Quiz")
                    return <Quiz key={lesson.id} lesson={lesson} />;
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
                <Suspense>
                  <EditButton />
                </Suspense>
              )}
            </section>
          )}
        </div>

        {isContentLoaded && <OnThisPageBar section={data.section} />}
      </div>

      {isSuccess && (
        <Suspense>
          <EditContentForm section={data.section} />
        </Suspense>
      )}
    </>
  );
};

export default Content;
