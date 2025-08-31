"use client";
import api from "@/lib/axios";
import { useAppSelector } from "@/lib/hooks";
import { DbSection } from "@/types/dbSection";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense } from "react";
import ContentSideBar from "./ContentSideBar";
import Actions from "./Actions";
const Video = lazy(() => import("./Video"));
const Text = lazy(() => import("./Text"));
const Quiz = lazy(() => import("./Quiz"));
type Data = {
  section: DbSection;
  prevSection: { id: number; sectionGroupId: number } | null;
  nextSection: { id: number; sectionGroupId: number } | null;
};
const Content = () => {
  const currentSection = useAppSelector(
    (store) => store.CourseView.currentSection
  );
  const { data, isPending, isError } = useQuery<Data>({
    queryKey: ["section", currentSection.id],
    queryFn: async () => {
      const res = await api.get(
        `/sections/${currentSection.sectionGroupId}/${currentSection.id}`
      );
      return res.data;
    },
    enabled: !!currentSection.id,
    gcTime: 0,
  });
  if (isPending) return <Loader />;
  if (isError) return null;
  return (
    <Suspense fallback={<Loader />}>
      <div className="grid max-md:grid-cols-1 grid-cols-[4fr_1fr]">
        <section
          className="flex flex-col gap-1 overflow-y-auto h-[90.5vh] max-sm:h-full"
          id="styledScrollbar"
        >
          <div className="mx-auto w-[95%]">
            {data.section.lessons?.map((lesson) => {
              if (lesson.contentType === "Text")
                return <Text key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Video")
                return <Video key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Quiz")
                return <Quiz key={lesson.id} lesson={lesson} />;
            })}
          </div>
          <Actions
            nextSection={data.nextSection}
            prevSection={data.prevSection}
          />
        </section>

        <section>
          <ContentSideBar section={data.section} />
        </section>
      </div>
    </Suspense>
  );
};

export default Content;
