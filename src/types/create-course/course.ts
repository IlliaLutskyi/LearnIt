import { Category } from "./category";
import { Prerequisite } from "./prerequisites";
import { SectionGroup } from "./section-group";
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
