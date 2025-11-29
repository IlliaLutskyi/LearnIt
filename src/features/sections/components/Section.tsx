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
          ? "border-l-2 border-secondary-accent"
          : "border-l-2 hover:border-secondary-accent border-slate-200"
      } pl-4`}
    >
      <Link
        href={`/course/${params.courseSlug}/${sectionGroupSlug}/${section.slug}`}
        className={`text-sm ${
          params.sectionSlug === section.slug
            ? "text-secondary-accent"
            : "hover:text-secondary-accent"
        } duration-400`}
      >
        {section.title}
      </Link>
    </div>
  );
};

export default Section;
