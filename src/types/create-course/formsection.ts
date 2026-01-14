import { State } from "../../../prisma/generated/prisma";

export type FormSection = {
  title?: string;
  showSectionsOnly?: boolean;
  state?: State;
};
