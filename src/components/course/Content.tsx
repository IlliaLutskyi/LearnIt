"use client";
import api from "@/lib/axios";
import { useAppSelector } from "@/lib/hooks";
import { DbSection } from "@/types/dbSection";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense } from "react";
import ContentSideBar from "./ContentSideBar";
const Video = lazy(() => import("./Video"));
const Text = lazy(() => import("./Text"));
const Quiz = lazy(() => import("./Quiz"));
const Content = () => {
  const currentSectionId = useAppSelector(
    (store) => store.CourseView.currentSectionId
  );
  const { data, isPending, isError } = useQuery<{ section: DbSection }>({
    queryKey: ["section", currentSectionId],
    queryFn: async () => {
      const res = await api.get(`/sections/${currentSectionId}`);
      return res.data;
    },
    enabled: !!currentSectionId,
  });
  if (isError) return <p>Something went wrong please try refresh page </p>;
  if (isPending) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <div className="grid max-md:grid-cols-1 grid-cols-[4fr_1fr]">
        <section className="flex flex-col gap-1 w-[90%] mx-auto">
          <div
            className="overflow-y-auto h-[calc(100vh-3.5rem)] "
            id="scrollbar"
          >
            {data.section.lessons?.map((lesson) => {
              if (lesson.contentType === "Text")
                return <Text key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Video")
                return <Video key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Quiz")
                return <Quiz key={lesson.id} lesson={lesson} />;
            })}
          </div>
        </section>

        <section>
          <ContentSideBar section={data.section} />
        </section>
      </div>
    </Suspense>
  );
};

export default Content;
