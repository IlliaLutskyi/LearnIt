import z from "zod";
import {
  GenerateLesson,
  GenerateLessonSchema,
} from "../schemas/generate-lesson-schema";
import { ai } from "@/lib/ai";
import { getPropmt } from "../utils/get-prompt";

export async function generateLesson(req: Request) {
  const data: GenerateLesson = await req.json();
  try {
    const res = GenerateLessonSchema.safeParse(data);
    if (!res.success)
      return Response.json(
        { message: z.prettifyError(res.error) },
        { status: 400 }
      );
    const prompt = getPropmt({
      contentType: data.contentType,
      description: data.prompt,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    const json = response.text?.match(/```json\s*([\s\S]*?)\s*```/)?.[1].trim();
    return Response.json(
      {
        lesson: json,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message:
          err instanceof Error && JSON.parse(err.message)?.error?.message
            ? JSON.parse(err.message).error.message
            : "Unable to generate lesson",
      },
      { status: 500 }
    );
  }
}
