"use client";
import api from "@/lib/axios";
import { DbSection } from "@/types/dbSection";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense } from "react";
import ContentSideBar from "./ContentSideBar";
import Actions from "./Actions";
import Rating from "./Rating";
import { useParams } from "next/navigation";
import { DbNextOrPrevSection } from "@/types";

const Video = lazy(() => import("./Video"));
const Text = lazy(() => import("./Text"));
const Quiz = lazy(() => import("./Quiz"));
type Data = {
  section: DbSection;
  prevSection: DbNextOrPrevSection | null;
  nextSection: DbNextOrPrevSection | null;
};
const Content = () => {
  const params = useParams();
  const { data, isPending, isError } = useQuery<Data>({
    queryKey: ["section", params.sectionSlug],
    queryFn: async () => {
      const res = await api.get(`/sections/${params.sectionSlug}`);
      return res.data;
    },
    enabled: !!params.sectionSlug,
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
          <div className="mx-auto w-[95%] mt-2">
            {data.section.lessons?.map((lesson) => {
              if (lesson.contentType === "Text")
                return <Text key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Video")
                return <Video key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Quiz")
                return <Quiz key={lesson.id} lesson={lesson} />;
            })}
          </div>
          <div className="h-full flex flex-col justify-end">
            <Rating sectionId={data.section.id} />
            <Actions
              nextSection={data.nextSection}
              prevSection={data.prevSection}
            />
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
