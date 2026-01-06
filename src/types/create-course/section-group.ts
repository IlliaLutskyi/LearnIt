import { State } from "../../../prisma/generated/prisma";
import { Section } from "./section";

export type SectionGroup = {
  title: string;
  slug: string;
  state: State;
  showSectionsOnly: boolean;
  sections: Section[];
  order: number;
};
