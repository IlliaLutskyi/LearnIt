import { Section } from "./section";

export type SectionGroup = {
  title: string;
  slug: string;
  sections: Section[];
  order: number;
};
