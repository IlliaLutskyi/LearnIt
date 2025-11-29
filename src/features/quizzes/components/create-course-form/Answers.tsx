"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { CiTrash } from "react-icons/ci";
import { Answer } from "@/types/create-course";
import Input from "../../../../components/common/Input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  answers: Answer[];
  remove: UseFieldArrayRemove;
  register: UseFormRegister<T>;
  errors: FieldErrors<{
    answers: Answer[];
  }>;
};
const Answers = <T extends FieldValues>({
  answers,
  errors,
  remove,
  register,
}: Props<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Answer</TableHead>
          <TableHead className="text-center">IsCorrect</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {answers.map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Input
                  {...register(`answers.${index}.content` as Path<T>)}
                  error={errors.answers?.[index]?.content?.message}
                  className="input-field h-[6rem] max-h-[10rem]"
                  multiline={true}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="checkbox"
                  {...register(`answers.${index}.isCorrect` as Path<T>)}
                  className="m-auto rounded-sm text-lg"
                />
              </TableCell>

              <TableCell className="text-center align-middle">
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="m-auto bg-error text-white p-2 rounded-sm hover:scale-95 duration-400"
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
