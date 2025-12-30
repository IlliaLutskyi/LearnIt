import z from "zod";
import {
  GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { ai, ai_model } from "@/lib/ai";
import { isJsonValid } from "@/utils/isJsonValid";
import { AiResponseSchema } from "../../schemas/ai-response-schema";
import { vi } from "zod/v4/locales";
import { VideoSource } from "../../../../../prisma/generated/prisma";
export async function generateLesson(req: Request) {
  const data: GenerateLesson = await req.json();
  try {
    const { success: isValidData, error } =
      GenerateLessonSchema.safeParse(data);

    if (!isValidData)
      return Response.json(
        { message: z.prettifyError(error) },
        { status: 400 }
      );

    const prompt = `You are a lesson generator assistant. Based on this content type "${
      data.contentType
    }" and description "${
      data.prompt
    }", generate a lesson and return the lesson in a JSON format. Examples of lessons: 
    ${examples.map((example, index) => {
      return `${index + 1}. {"contentType": "${
        example.contentType
      }", "content": "${example.content}"}`;
    })}
    `;

    const response = await ai.models.generateContent({
      model: ai_model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(AiResponseSchema),
      },
    });

    const lesson = isJsonValid(response.text || "")
      ? JSON.parse(response.text!)
      : undefined;

    return Response.json(
      {
        lesson: lesson,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);
    return Response.json(
      {
        message:
          err instanceof Error ? err.message : "Unable to generate lesson",
      },
      { status: 500 }
    );
  }
}

const examples = [
  {
    contentType: "Text",
    content:
      '<p>Intro to system architecture. <a href="https://example.com">Docs</a></p>',
  },
  {
    contentType: "Video",
    content: "https://www.youtube.com/watch?v=MfB0dd4thBk",
    videoSource: "Youtube",
  },
  {
    contentType: "Table",
    content: [
      { id: 1, email: "a@ex.com", role: "admin" },
      { id: 2, email: "b@ex.com", role: "user" },
    ],
  },
  {
    contentType: "Markdown",
    content: "<h2>Setup</h2><pre><code>npm i && npm run dev</code></pre>",
  },
  {
    contentType: "HighlightedCode",
    content: "app.get('/health',(_,r)=>r.json({ok:true}))",
  },
];
