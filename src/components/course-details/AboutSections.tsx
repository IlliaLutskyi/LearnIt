import { lazy, Suspense } from "react";
import Loader from "../common/Loader";
import { DbSectionGroup } from "@/types";
const SectionInfo = lazy(() => import("./SectionInfo"));

type Props = {
  sectionGroups: DbSectionGroup[];
};
const AboutSections = ({ sectionGroups }: Props) => {
  return (
    <div className="flex flex-col">
      {sectionGroups.map((sectionGroup) => {
        return (
          <Suspense key={sectionGroup.id} fallback={<Loader />}>
            <SectionInfo sectionGroup={sectionGroup} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default AboutSections;
