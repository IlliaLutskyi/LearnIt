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
    <div>
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
