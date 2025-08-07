import { Category } from "./category";
import { Section } from "./section";
import { SectionGroup } from "./sectionGroup";

export type Course = {
  title: string;
  category: Category;
  description: string;
  sectionGroups: SectionGroup[];
};
