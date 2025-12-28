import { Prerequisite } from "./prerequisite";
import { SectionGroup } from "./section-group";
import { Skill } from "./skill";

export type Course = {
  poster: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  skills: Skill[];
  sectionGroups: SectionGroup[];
  prerequisites: Prerequisite[];
};
