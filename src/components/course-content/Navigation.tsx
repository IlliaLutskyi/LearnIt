"use client";
import { DbNextOrPrevSection } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  nextSection: DbNextOrPrevSection | null;
  prevSection: DbNextOrPrevSection | null;
};
const Navigation = ({ nextSection, prevSection }: Props) => {
  const params = useParams();

  return (
    <div className="flex gap-2">
      <Link
        href={`/course/${params.courseSlug}/${prevSection?.sectionGroup.slug}/${prevSection?.slug}`}
        className="w-full"
      >
        <button
          className={`w-full flex flex-col items-start gap-2 text-xs text-purple-500 hover:text-purple-900 border-purple-500 border-[1px] p-8 rounded-2xl hover:border-purple-900 ${
            !prevSection && "hidden"
          } duration-400`}
        >
          <span className="font-bold text-sm text-black">Back</span>
          <span className="text-sm line-clamp-1">
            {"<- " + prevSection?.title}
          </span>
        </button>
      </Link>

      <Link
        href={`/course/${params.courseSlug}/${nextSection?.sectionGroup.slug}/${nextSection?.slug}`}
        className="w-full"
      >
        <button
          className={`w-full flex flex-col items-end gap-2 text-xs text-purple-500 hover:text-purple-900 border-purple-500 border-[1px] p-8 rounded-2xl hover:border-purple-900 ${
            !nextSection && "hidden"
          } duration-200`}
        >
          <span className="font-bold text-sm text-black">Next</span>
          <span className="text-sm line-clamp-1">
            {nextSection?.title + " ->"}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Navigation;
