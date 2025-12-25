import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: number;
  showSectionsOnly?: boolean;
  title: string;
  slug: string;
  order: number;
  sections?: DbSection[];
  courseId?: number;
};
