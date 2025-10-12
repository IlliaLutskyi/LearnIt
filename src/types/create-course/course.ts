import { Category } from "./category";
import { Prerequisite } from "./prerequisites";
import { SectionGroup } from "./sectionGroup";
import { Skill } from "./skill";

export type Course = {
  title: string;
  slug: string;
  category: Category;
  description: string;
  skills: Skill[];
  sectionGroups: SectionGroup[];
  prerequisites: Prerequisite[];
};
