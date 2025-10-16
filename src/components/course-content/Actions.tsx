"use client";
import { DbNextOrPrevSection } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  nextSection: DbNextOrPrevSection | null;
  prevSection: DbNextOrPrevSection | null;
};
const Actions = ({ nextSection, prevSection }: Props) => {
  const params = useParams();

  return (
    <div className="flex justify-between gap-4 items-end mx-4">
      <Link
        href={`/course/${params.courseSlug}/${prevSection?.sectionGroup.slug}/${prevSection?.slug}`}
        className={`text-sm text-purple-400 ${
          !prevSection
            ? "cursor-not-allowed"
            : "hover:text-purple-600 hover:underline"
        } duration-400 p-2`}
      >
        Go Back
      </Link>

      <Link
        href={`/course/${params.courseSlug}/${nextSection?.sectionGroup.slug}/${nextSection?.slug}`}
        className={`text-sm text-purple-400 ${
          !nextSection
            ? "cursor-not-allowed"
            : "hover:text-purple-600 hover:underline"
        } duration-200 p-2`}
      >
        Go Next
      </Link>
    </div>
  );
};

export default Actions;
