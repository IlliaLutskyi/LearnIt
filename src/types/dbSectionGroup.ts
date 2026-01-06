import { State } from "../../prisma/generated/prisma";
import { DbSection } from "./dbSection";

export type DbSectionGroup = {
  id: string;
  state: State;
  showSectionsOnly?: boolean;
  title: string;
  slug: string;
  order: number;
  sections?: DbSection[];
  courseId?: string;
};
