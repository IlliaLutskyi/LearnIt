import { DbCategory } from "./dbCategory";
import { DbPrerequisite } from "./dbPrerequisite";
import { DbSectionGroup } from "./dbSectionGroup";
import { DbSkill } from "./dbSkill";
import { DbUser } from "./dbUser";

export type DbCourse = {
  id: number;
  title: string;
  poster: string;
  description: string;
  slug: string;
  category: DbCategory;
  user?: DbUser;
  sectionGroups?: DbSectionGroup[];
  prerequisites?: DbPrerequisite[];
  skills?: DbSkill[];
  createdAt?: Date;
  updatedAt?: Date;
};
