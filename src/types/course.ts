import { Category } from "./category";
import { Preriquisite } from "./prerequisites";
import { Section } from "./section";
import { SectionGroup } from "./sectionGroup";
import { Skill } from "./skill";

export type Course = {
  title: string;
  category: Category;
  description: string;
  skills: Skill[];
  sectionGroups: SectionGroup[];
  prerequisites: Preriquisite[];
};
