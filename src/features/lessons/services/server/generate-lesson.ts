import z from "zod";
import {
  GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { ai } from "@/lib/ai";
import { extractFromJSON } from "@/utils/exractFromJSON";

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
    const prompt = `Based on this description ${data.prompt}, generate lesson and return the lesson in a JSON format. The response has to be valid json and be like this example: 
    {
   "type": "doc",
  "content": [
     {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "Tiptap Text Formatting Example" }]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is " },
        { "type": "text", "marks": [{ "type": "bold" }], "text": "bold" },
        { "type": "text", "text": ", " },
        { "type": "text", "marks": [{ "type": "italic" }], "text": "italic" },
        { "type": "text", "text": ", " },
        { "type": "text", "marks": [{ "type": "underline" }], "text": "underlined" },
        { "type": "text", "text": ", " },
        { "type": "text", "marks": [{ "type": "strike" }], "text": "strikethrough" },
        { "type": "text", "text": ", and " },
        { "type": "text", "marks": [{ "type": "code" }], "text": "inline code" },
        { "type": "text", "text": "." }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "You can also include " },
        {
          "type": "text",
          "marks": [
            {
              "type": "link",
              "attrs": { "href": "https://tiptap.dev", "target": "_blank" }
            }
          ],
          "text": "links"
        },
        { "type": "text", "text": " to websites." }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Lists" }]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Bullet item 1" }] }]
        },
        {
          "type": "listItem",
          "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Bullet item 2" }] }]
        }
      ]
    },
    {
      "type": "orderedList",
      "attrs": { "start": 1 },
      "content": [
        {
          "type": "listItem",
          "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Numbered item 1" }] }]
        },
        {
          "type": "listItem",
          "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Numbered item 2" }] }]
        }
      ]
    },
    {
      "type": "blockquote",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "This is a blockquote." }] }
      ]
    },
    {
      "type": "codeBlock",
      "attrs": { "language": "javascript" },
      "content": [
        { "type": "text", "text": "console.log('Hello from a code block!');" }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Finally, here's some " },
        { "type": "text", "marks": [{ "type": "highlight" }], "text": "highlighted text" },
        { "type": "text", "text": " if you have the highlight extension." }
      ]
    }
  ]
}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    console.log(response.text);
    const lesson = extractFromJSON(response.text);
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
