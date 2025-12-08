import z from "zod";
import {
  GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { ai, ai_model } from "@/lib/ai";
import { isJsonValid } from "@/utils/isJsonValid";

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
    const prompt = `You are a lesson generator assistant. Based on this description "${data.prompt}", generate a lesson and return the lesson in a JSON format. Response examples: 
    1. {"content":"<h1>Project Retrospective: Q4 2025</h1><p>This document summarizes key findings. We saw **strong** growth in Q4, despite a *slowdown* in November. Data is available at <a href=\"https://analytics.example.com/q4\" target=\"_blank\" rel=\"nofollow\">the analytics dashboard</a>. <br>The team is ready for the next phase.</p><h2>Action Items</h2><ol><li>Finalize the budget for Q1 2026.</li><li>Begin hiring for new roles:<ul><li>Frontend Developer</li><li>Backend Architect</li></ul></li><li><p>Schedule the training session on this topic:</p><p>Using the <code>new_feature_branch</code> for development work.</p></li></ol><blockquote><p>The success of the project was largely due to the consistent application of agile principles and effective communication across all teams.</p><p>— CEO's Quarterly Address</p></blockquote><h3>Technical Review</h3><p>There was a minor bug in the utility library that was addressed:</p><pre><code class=\"language-typescript\">interface User {\n id: number;\n name: string;\n // Bug fix: email was optional but should be required\n email: string; \n}</code></pre><hr><p>This document is complete. Please note the <del>minor error</del> has been resolved, and the final code is certified.</p>"}
    `;

    const response = await ai.models.generateContent({
      model: ai_model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description:
                "The tiptap based html content with StarterKit and Link extensions",
            },
          },
        },
      },
    });

    const lesson = isJsonValid(response.text || "")
      ? JSON.parse(response.text!)
      : undefined;

    console.log(lesson);

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
