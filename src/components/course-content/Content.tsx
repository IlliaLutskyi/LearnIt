"use client";
import api from "@/lib/axios";
import { DbSection } from "@/types/dbSection";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { lazy, Suspense } from "react";
import Actions from "./Actions";
import SetRating from "../../features/ratings/components/SetRating";
import { useParams } from "next/navigation";
import { DbNextOrPrevSection } from "@/types";
import OnThisPageBar from "./OnThisPageBar";
import EditButton from "./EditButton";
import { useSession } from "next-auth/react";
import EditContentForm from "./EditContentForm";
const Video = lazy(() => import("@/features/lessons/components/Video"));
const Text = lazy(() => import("@/features/lessons/components/Text"));
const Quiz = lazy(() => import("@/features/quizes/components/Quiz"));
type Data = {
  section: DbSection;
  prevSection: DbNextOrPrevSection | null;
  nextSection: DbNextOrPrevSection | null;
};
const Content = () => {
  const params = useParams();
  const { data: session } = useSession();
  const { data, isPending, isError } = useQuery<Data>({
    queryKey: ["section", params.sectionSlug],
    queryFn: async () => {
      const res = await api.get(
        `/sections/${params.courseSlug}/${params.sectionSlug}`
      );
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
          <div className="grow mt-4 mx-4">
            {data.section.lessons?.map((lesson) => {
              if (lesson.contentType === "Text")
                return <Text key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Video")
                return <Video key={lesson.id} lesson={lesson} />;
              if (lesson.contentType === "Quiz")
                return <Quiz key={lesson.id} lesson={lesson} />;
            })}
          </div>
          <div className="flex flex-col gap-2 justify-end mb-4 mx-4">
            <SetRating sectionId={data.section.id} />
            <Actions
              nextSection={data.nextSection}
              prevSection={data.prevSection}
            />
            {session?.user && session.user.role === "Admin" && <EditButton />}
            <EditContentForm section={data.section} />
          </div>
        </section>

        <OnThisPageBar section={data.section} />
      </div>
    </Suspense>
  );
};

export default Content;
