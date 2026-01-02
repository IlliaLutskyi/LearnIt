import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: string;
  showSectionsOnly?: boolean;
  title: string;
  slug: string;
  order: number;
  sections?: DbSection[];
  courseId?: string;
};
