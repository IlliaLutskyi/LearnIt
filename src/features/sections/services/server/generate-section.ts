import z from "zod";
import {
  GenerateSection,
  GenerateSectionSchema,
} from "../../schemas/generate-section";
import { ai, ai_model } from "@/lib/ai";
import { isJsonValid } from "@/utils/isJsonValid";

export async function generateSection(req: Request) {
  const data: GenerateSection = await req.json();
  try {
    const { success: isValidData, error } =
      GenerateSectionSchema.safeParse(data);
    if (!isValidData)
      return Response.json(
        {
          message: error.message,
        },
        { status: 400 }
      );

    const prompt = `You are a section generator assistant. Based on this description ${data.prompt} generate a section with title ${data.title} **NOTE Lesson with ContentType Text is the tiptap based html with StarterKit and Link extensions, Lesson with ContentType HighlightedCode is recommended for code examples or code snippets**. Return the section in a JSON format. Response examples:
   1. {"title":"Introduction to Web Development","lessons":[{"order":1,"title":"Welcome to the Course","contentType":"Video","videoSource":"Youtube","content":"https://www.youtube.com/embed/dQw4w9WgXcQ"},{"order":2,"title":"What is Web Development?","contentType":"Text","content":"<h1>The Fundamentals of Web Development</h1><p>Web development is the essential practice of building, creating, and maintaining websites and web applications. Think of it as the construction site for everything you see online. A key point is that good web development requires <strong>consistency</strong> and <em>attention to detail</em>.</p><h2>The Two Pillars</h2><p>Modern development is separated into distinct roles:</p><ul><li><strong>Frontend:</strong> The client-side, concerned with user interface and experience (UI/UX). This is where HTML, CSS, and JavaScript run.</li><li><strong>Backend:</strong> The server-side, handling data storage, business logic, and security. Technologies include Node.js, Python, and SQL databases.</li></ul><p>For more details on the distinction, you can check out this <a href=\"https://example.com/web-dev-roles\" target=\"_blank\" rel=\"noopener noreferrer\">comprehensive article on web dev roles</a>.</p>"},{"order":3,"title":"Basic HTML Structure","contentType":"Markdown","content":"<h1>Basic HTML Structure</h1><p>HTML is the foundation of all websites. It defines <strong>what</strong> appears on the screen, not how it looks.</p><p>Every HTML page follows this structure:</p><pre><code>&lt;!DOCTYPE html&gt;\\n&lt;html&gt;\\n \t&lt;head&gt;\\n \t  &lt;title&gt;My First Page&lt;/title&gt;\\n \t&lt;/head&gt;\\n \t&lt;body&gt;\\n \t  &lt;h1&gt;Hello World!&lt;/h1&gt;\\n \t  &lt;p&gt;This is my first webpage.&lt;/p&gt;\\n \t&lt;/body&gt;\\n&lt;/html&gt;</code></pre><p>The <strong>doctype</strong> tells the browser this is HTML5. The <strong>head</strong> contains metadata. The <strong>body</strong> contains everything visible to the user.</p>"},{"order":4,"title":"Common HTML Elements (Table)","contentType":"Table","content":"[{\"Tag\":\"h1 - h6\",\"Purpose\":\"Headings of different sizes\",\"__rowNum__\":0},{\"Tag\":\"p\",\"Purpose\":\"Paragraph text\",\"__rowNum__\":1},{\"Tag\":\"a\",\"Purpose\":\"Links to other pages\",\"__rowNum__\":2},{\"Tag\":\"img\",\"Purpose\":\"Displays an image\",\"__rowNum__\":3},{\"Tag\":\"ul / li\",\"Purpose\":\"Unordered list\",\"__rowNum__\":4}]"},{"order":5,"title":"HTML Quiz","contentType":"Quiz","quiz":{"question":"Which HTML tag is used to create a link?","explanation":"The <a> tag creates a hyperlink that can point to another page or location.","answers":[{"content":"<p>","isCorrect":false},{"content":"<img>","isCorrect":false},{"content":"<a>","isCorrect":true}]}},{"order":6,"title":"Introduction to CSS","contentType":"Markdown","content":"<h2>Introduction to CSS</h2><p>CSS (Cascading Style Sheets) is what makes websites look good. Without CSS, all pages would look plain, with only black text on a white background.</p><p>CSS controls:</p><ul><li>colors</li><li>fonts</li><li>spacing</li><li>layouts</li><li>responsive design</li></ul><p>Here is an example:</p><pre><code>h1 {\\n \tcolor: blue;\\n \ttext-align: center;\\n}\\n\\np {\\n \tfont-size: 18px;\\n}</code></pre><p>This code makes the heading blue and centers it. It also changes the paragraph text size.</p>"},{"order":7,"title":"CSS Properties (Intermediate Table)","contentType":"Table","content":"[{\"Property\":\"color\",\"Description\":\"Sets text color\",\"Example\":\"color: red;\",\"__rowNum__\":0},{\"Property\":\"padding\",\"Description\":\"Inner spacing inside an element\",\"Example\":\"padding: 20px;\",\"__rowNum__\":1},{\"Property\":\"margin\",\"Description\":\"Outer spacing outside an element\",\"Example\":\"margin: 10px;\",\"__rowNum__\":2},{\"Property\":\"border\",\"Description\":\"Outline around an element\",\"Example\":\"border: 1px solid black;\",\"__rowNum__\":3},{\"Property\":\"display\":\"Defines layout behavior\",\"Example\":\"display: flex;\",\"__rowNum__\":4}]"},{"order":8,"title":"CSS Deep Quiz","contentType":"Quiz","quiz":{"question":"What does the 'display: flex' property do?","explanation":"Flexbox creates a flexible layout that allows items to automatically adjust their size and position.","answers":[{"content":"Applies a fixed layout","isCorrect":false},{"content":"Creates a flexible container for alignment","isCorrect":true},{"content":"Changes text color","isCorrect":false}]}},{"order":9,"title":"JavaScript Introduction (Advanced Text)","contentType":"Text","content":"<h1>JavaScript: The Language of Interaction</h1><p>JavaScript (JS) is the only programming language native to web browsers. Its primary role is to control <strong>behavior</strong> and interactivity. It makes static pages come alive, powering complex elements like interactive charts, form validations, and real-time updates.</p><h2>Understanding the DOM</h2><p>When JS executes, it interacts mainly with the **DOM** (Document Object Model). The DOM is a tree structure representing the entire web page. Using JS, you can find elements (e.g., using <code>document.getElementById()</code>), change their content, or modify their styles.</p><p>You can learn more about the DOM's structure and methods <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model\" target=\"_blank\" rel=\"noopener\">here on MDN</a>.</p><pre><code class=\"language-javascript\">document.querySelector('#main-button').addEventListener('click', () => {\\n \tconsole.log('Button clicked!');\\n});</code></pre><p>This snippet demonstrates how JS uses the DOM to add an event listener to an element.</p>"},{"order":10,"title":"Advanced JavaScript Quiz","contentType":"Quiz","quiz":{"question":"What is the DOM in JavaScript?","explanation":"The DOM (Document Object Model) is a tree-like structure that represents the page's content and allows JavaScript to manipulate elements dynamically.","answers":[{"content":"A database used by JavaScript","isCorrect":false},{"content":"A tree structure representing the webpage","isCorrect":true},{"content":"A CSS layout system","isCorrect":false}]}},{"order":11,"title":"JS Lesson 1: Variables and Logging","contentType":"HighlightedCode","content":"const courseName = \"Web Dev Intro\";\nlet studentCount = 150;\n\nconsole.log(courseName);\n\nstudentCount = studentCount + 1;\nconsole.log(\"New count: studentCount\"); "},{"order":12,"title":"JS Lesson 2: Basic Functions","contentType":"HighlightedCode","content":"function greetUser(username) {\n \treturn \"Hello, username! Welcome back.\"\n}\n\nlet message = greetUser(\"Alex\");\nconsole.log(message);"}],"__type":"CourseModule"}
    `;

    const response = await ai.models.generateContent({
      model: ai_model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the entire course.",
            },
            lessons: {
              type: "array",
              description:
                "A sequential list of all lessons or modules in the course.",
              items: {
                type: "object",
                properties: {
                  order: {
                    type: "integer",
                    description:
                      "The sequential order of the lesson starting from 1.",
                  },
                  title: {
                    type: "string",
                    description: "The title of the individual lesson.",
                  },
                  contentType: {
                    type: "string",
                    enum: ["Video", "Text", "Table", "Quiz", "HighlightedCode"],
                    description:
                      "The format of the content (e.g., Text/HTML, Video URL, Quiz object).",
                  },
                  content: {
                    type: "string",
                    description:
                      "The content value. For 'Text', this is the tiptap HTML with StarterKit and Link extensions enabled. For 'Video', it's the embed URL. For 'HighlightedCode', it's the raw code string. For 'Table', it's a stringified JSON array of row objects.",
                  },
                  videoSource: {
                    type: "string",
                    description:
                      "The platform hosting the video (e.g., 'Youtube'). Only included if contentType is 'Video'.",
                  },
                  quiz: {
                    type: ["object", "null"],
                    description:
                      "The detailed quiz object structure. Only included if contentType is 'Quiz'.",
                    properties: {
                      question: {
                        type: "string",
                      },
                      explanation: {
                        type: "string",
                      },
                      answers: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            content: {
                              type: "string",
                            },
                            isCorrect: {
                              type: "boolean",
                            },
                          },
                          required: ["content", "isCorrect"],
                        },
                      },
                    },
                    required: ["question", "explanation", "answers"],
                  },
                },
                required: ["order", "title", "contentType"],
              },
            },
          },
          required: ["title", "lessons"],
        },
      },
    });

    const section = isJsonValid(response.text || "")
      ? JSON.parse(response.text || "")
      : undefined;

    return Response.json({ section: section }, { status: 200 });
  } catch (err) {
    return Response.json(
      {
        message:
          err instanceof Error ? err.message : "Unable to generate section",
      },
      { status: 500 }
    );
  }
}
