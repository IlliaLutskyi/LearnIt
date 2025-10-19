"use client";
import { DbSection } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  section: DbSection;
  sectionGroupSlug: string;
};
const Section = ({ section, sectionGroupSlug }: Props) => {
  const params = useParams();
  return (
    <div
      className={`${
        section.slug === params.sectionSlug
          ? "border-l-2 border-orange-400"
          : "border-l-2 hover:border-orange-400 border-slate-200"
      } pl-4`}
    >
      <Link
        href={`/course/${params.courseSlug}/${sectionGroupSlug}/${section.slug}`}
        className={`text-sm ${
          params.sectionSlug === section.slug
            ? "text-orange-300"
            : "text-white hover:text-orange-300"
        } duration-400`}
      >
        {section.title}
      </Link>
    </div>
  );
};

export default Section;
