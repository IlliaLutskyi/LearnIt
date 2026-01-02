import z from "zod";
import {
  GenerateLesson,
  GenerateLessonSchema,
} from "../../schemas/generate-lesson-schema";
import { ai, ai_model } from "@/lib/ai";
import { isJsonValid } from "@/utils/isJsonValid";
import { AiResponseSchema } from "../../schemas/ai-response-schema";
export async function generateLesson(req: Request) {
  const data: GenerateLesson = await req.json();
  try {
    const { success: isValidData, error } =
      GenerateLessonSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: error.message }, { status: 400 });

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

const examples = [
  {
    contentType: "Text",
    content: `
      <h2>System Architecture Overview</h2>
      <p>This document explains the <strong>core architecture</strong> of our platform, focusing on <em>scalability</em>, <s>legacy constraints</s>, and <code>service isolation</code>. Full documentation is available <a href="https://example.com/docs" target="_blank" rel="noopener noreferrer">here</a>.</p>
      <blockquote><p>“Good architecture allows the system to evolve <strong>without rewriting everything</strong>.”</p></blockquote>
      <h3>Key Components</h3>
      <ul>
        <li><strong>API Gateway</strong> – request routing & auth</li>
        <li><em>Core Services</em> – business logic</li>
        <li>Database layer – PostgreSQL & Redis</li>
      </ul>
      <h3>Request Flow</h3>
      <ol>
        <li>Client sends HTTP request</li>
        <li>Gateway validates JWT</li>
        <li>Service processes data</li>
        <li>Response returned to client</li>
      </ol>
      <hr />
      <p>Example health check endpoint:<br /><code>GET /health</code></p>
      <pre><code class="language-js">
app.get('/health', (_, res) => {
  res.json({ ok: true });
});
      </code></pre>
      <p>For implementation details, see <a href="https://example.com/api" target="_blank" rel="noopener noreferrer">API Reference</a>.</p>
    `,
  },
  {
    contentType: "Table",
    content: [
      { id: 1, email: "admin@ex.com", role: "admin", status: "active" },
      { id: 2, email: "user@ex.com", role: "user", status: "pending" },
      { id: 3, email: "guest@ex.com", role: "guest", status: "disabled" },
    ],
  },
  {
    contentType: "HighlightedCode",
    content: `
import express from "express";

const app = express();

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

app.listen(3000);
    `,
  },
];
