import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: number;
  title: string;
  order: number;
  sections?: DbSection[];
};
