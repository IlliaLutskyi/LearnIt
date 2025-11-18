"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense, useRef } from "react";
import Navigation from "./Navigation";
import SetRating from "../../features/ratings/components/SetRating";
import { useParams } from "next/navigation";
import OnThisPageBar from "./OnThisPageBar";
import EditButton from "./EditButton";
import { useSession } from "next-auth/react";
import EditContentForm from "./EditContentForm";
import { motion, useScroll } from "framer-motion";
import { getSection } from "@/features/sections/services/get-section";

const Video = lazy(() => import("@/features/lessons/components/Video"));
const Text = lazy(() => import("@/features/lessons/components/Text"));
const Quiz = lazy(() => import("@/features/quizzes/components/Quiz"));

const Content = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { scrollYProgress } = useScroll({ container: containerRef });
  const params = useParams();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["section", params.sectionSlug],
    queryFn: () =>
      getSection(params.courseSlug as string, params.sectionSlug as string),
    enabled: !!params.sectionSlug,
  });

  return (
    <>
      <div className="grid max-md:grid-cols-1 grid-cols-[4fr_1fr]">
        <div
          ref={containerRef}
          className="relative grow flex flex-col gap-1 overflow-y-auto h-[90.5vh] max-sm:h-full"
          id="styledScrollbar"
        >
          {isSuccess && !isPending && (
            <motion.div
              className="bg-pink-400 sticky top-0 p-1"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          )}

          {isPending && <Loader />}

          {isSuccess && !isPending && (
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

          {isSuccess && !isPending && (
            <section className="flex flex-col gap-2 justify-end mb-4 mx-4">
              <SetRating sectionId={data.section.id} />
              <Navigation
                nextSection={data.nextSection}
                prevSection={data.prevSection}
              />
              {session?.user && session.user.role === "Admin" && <EditButton />}
            </section>
          )}
        </div>

        {isSuccess && !isPending && <OnThisPageBar section={data.section} />}
      </div>

      {isSuccess && <EditContentForm section={data.section} />}
    </>
  );
};

export default Content;
