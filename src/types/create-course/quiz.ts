import { Answer } from "./answer";

export type Quiz = {
  question: string;
  explanation: string;
  answers: Answer[];
};
