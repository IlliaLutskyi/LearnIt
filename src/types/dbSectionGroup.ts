import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: number;
  title: string;
  slug: string;
  order: number;
  sections?: DbSection[];
};
