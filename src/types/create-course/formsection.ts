import { State } from "../../../prisma/generated/prisma";

export type FormSection = {
  title?: string;
  state?: State;
};
