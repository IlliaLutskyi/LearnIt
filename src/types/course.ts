import { Category } from "./category";
import { Section } from "./section";

export type Course = {
  id: number;
  title: string;
  category: Category;
  description: string;
  createdAt: Date;
  sections: Section[];
  updatedAt: Date;
};
