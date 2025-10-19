"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CiTrash } from "react-icons/ci";
import { Answer } from "@/types/create-course";
import Input from "../common/Input";

type Props = {
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
};
const Answers = ({ answers, setAnswers }: Props) => {
  function editAnswer(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) {
    setAnswers((prev) => {
      const newAnswers = prev.map((answer, index) => {
        if (id === index) {
          return {
            ...answer,
            content: e.target.value,
          };
        }
        return answer;
      });
      return newAnswers;
    });
  }
  function handleDeleteAnswer(id: number) {
    setAnswers((prev) => prev.filter((_, index) => index !== id));
  }
  function handleCheckBox(id: number) {
    setAnswers((prev) => {
      const newAnswers = prev.map((answer, index) => {
        if (id === index) {
          return {
            ...answer,
            isCorrect: !answer.isCorrect,
          };
        }
        return answer;
      });
      return newAnswers;
    });
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Answer</TableHead>
          <TableHead>IsCorrect</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {answers.map((answer, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Input
                  value={answer.content}
                  onChange={(e) => editAnswer(e, index)}
                  className="text-sm w-full p-2 shadow-md rounded-sm outline-none focus:ring-1 focus:ring-purple-500 h-[6rem]"
                  multiline={true}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCheckBox(index)}
                  className="m-auto rounded-sm text-lg"
                />
              </TableCell>

              <TableCell>
                <button
                  type="button"
                  onClick={() => handleDeleteAnswer(index)}
                  className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-600  hover:scale-95 focus:scale-95 duration-500"
                >
                  <CiTrash />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Answers;
