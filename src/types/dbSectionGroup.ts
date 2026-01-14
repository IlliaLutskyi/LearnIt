import { State } from "../../prisma/generated/prisma";
import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: string;
  title: string;
  slug: string;
  state: State;
  order: number;
  showSectionsOnly?: boolean;
  sections?: DbSection[];
  courseId?: string;
};
