import z from "zod";
import {
  GenerateQuiz,
  GenerateQuizSchema,
} from "@/features/quizzes/schemas/generate-quiz";
import { ai, ai_model } from "@/lib/ai";
import { isJsonValid } from "@/utils/isJsonValid";

export async function generateQuizzes(req: Request) {
  try {
    const data: GenerateQuiz = await req.json();
    const { success: isValidData, error } = GenerateQuizSchema.safeParse(data);
    if (!isValidData)
      return Response.json(
        {
          message: z.prettifyError(error),
        },
        { status: 400 }
      );
    const propmt = `You are a quiz generator assistant. Based on this content: ${data.contents.map(
      (content) => {
        return `1. ${content.value} \n`;
      }
    )} generate ${data.quizzesQuantity} quizes with ${
      data.answersQuantity
    } answers each. Return the quizes in a JSON format. Response examples: 
    1. [{"title":"Map Method in JavaScript Quiz","question":"What does the map method do in JavaScript?","explanation":"The map method creates a new array by applying a callback function to each element of the original array.","answers":[{"content":"Transforms each element and returns a new array","isCorrect":true},{"content":"Modifies the original array directly","isCorrect":false},{"content":"Filters out elements based on a condition","isCorrect":false},{"content":"Sorts the array in ascending order","isCorrect":false}]},{"title":"Foreign Key in Database Quiz","question":"What is the purpose of a foreign key in a database?","explanation":"A foreign key creates a relationship between two tables and ensures referential integrity.","answers":[{"content":"To uniquely identify rows in a table","isCorrect":false},{"content":"To link rows between two tables","isCorrect":true},{"content":"To store large binary data","isCorrect":false},{"content":"To index the table for faster queries","isCorrect":false}]},{"title":"HTTP Methods Quiz","question":"Which HTTP method is typically used to update existing data?","explanation":"PUT replaces an existing resource, while PATCH updates only specific fields.","answers":[{"content":"GET","isCorrect":false},{"content":"POST","isCorrect":false},{"content":"PUT","isCorrect":true},{"content":"HEAD","isCorrect":false}]}]
`;
    const response = await ai.models.generateContent({
      model: ai_model,
      contents: propmt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              question: { type: "string" },
              explanation: { type: "string" },
              answers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    content: { type: "string" },
                    isCorrect: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    });

    const quizzes = isJsonValid(response.text || "")
      ? JSON.parse(response.text!)
      : undefined;

    return Response.json({ quizzes }, { status: 200 });
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);
    return Response.json(
      { message: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
