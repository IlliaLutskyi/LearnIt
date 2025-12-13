import { Section } from "./section";

export type SectionGroup = {
  title: string;
  slug: string;
  showSectionsOnly: boolean;
  sections: Section[];
  order: number;
};
