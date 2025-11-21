import z from "zod";
import {
  GenerateSection,
  GenerateSectionSchema,
} from "../../schemas/generate-section";
import { ai } from "@/lib/ai";
import { extractFromJSON } from "@/utils/exractFromJSON";

export async function generateSection(req: Request) {
  const data: GenerateSection = await req.json();
  try {
    const { success: isValidData, error } =
      GenerateSectionSchema.safeParse(data);
    if (!isValidData)
      return Response.json(
        {
          message: z.prettifyError(error),
        },
        { status: 400 }
      );
    const prompt = `Based on this description ${data.prompt} generate a section with title ${data.title}. Return the section in a JSON format. The response has to be valid json and be like this example:
 {
  "title": "Introduction to Web Development",
  "lessons": [
    {
      "order": 0,
      "title": "Welcome to the Course",
      "contentType": "Video",
      "videoSource": "Youtube",
      "content": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "order": 1,
      "title": "What is Web Development?",
      "contentType": "Text",
      "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"heading\",\"attrs\":{\"level\":1},\"content\":[{\"type\":\"text\",\"text\":\"What Is Web Development?\"}]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Web development is the process of building websites and web applications. At the beginner level, it simply means making pages that users can open in a browser. Every website you visit—Google, YouTube, TikTok—was created by web developers.\"}]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"There are two main parts:\"}]},{\"type\":\"bulletList\",\"content\":[{\"type\":\"listItem\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Frontend — what users see and interact with (HTML, CSS, JavaScript).\"}]}]},{\"type\":\"listItem\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Backend — servers, databases, authentication, APIs.\"}]}]}]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"This course will guide you through both, starting from the simplest concepts.\"}]}]}"
    },
    {
      "order": 2,
      "title": "Basic HTML Structure",
      "contentType": "Markdown",
      "content": "<h1>Basic HTML Structure</h1><p>HTML is the foundation of all websites. It defines <strong>what</strong> appears on the screen, not how it looks.</p><p>Every HTML page follows this structure:</p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;title&gt;My First Page&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Hello World!&lt;/h1&gt;\n    &lt;p&gt;This is my first webpage.&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p>The <strong>doctype</strong> tells the browser this is HTML5. The <strong>head</strong> contains metadata. The <strong>body</strong> contains everything visible to the user.</p>"
    },
    {
      "order": 3,
      "title": "Common HTML Elements (Table)",
      "contentType": "Table",
      "content": "[{\"Tag\":\"h1 - h6\",\"Purpose\":\"Headings of different sizes\",\"__rowNum__\":0},{\"Tag\":\"p\",\"Purpose\":\"Paragraph text\",\"__rowNum__\":1},{\"Tag\":\"a\",\"Purpose\":\"Links to other pages\",\"__rowNum__\":2},{\"Tag\":\"img\",\"Purpose\":\"Displays an image\",\"__rowNum__\":3},{\"Tag\":\"ul / li\",\"Purpose\":\"Unordered list\",\"__rowNum__\":4}]"
    },
    {
      "order": 4,
      "title": "HTML Quiz",
      "contentType": "Quiz",
      "quiz": {
        "question": "Which HTML tag is used to create a link?",
        "explanation": "The <a> tag creates a hyperlink that can point to another page or location.",
        "answers": [
          { "content": "<p>", "isCorrect": false },
          { "content": "<img>", "isCorrect": false },
          { "content": "<a>", "isCorrect": true }
        ]
      }
    },
    {
      "order": 5,
      "title": "Introduction to CSS",
      "contentType": "Markdown",
      "content": "<h2>Introduction to CSS</h2><p>CSS (Cascading Style Sheets) is what makes websites look good. Without CSS, all pages would look plain, with only black text on a white background.</p><p>CSS controls:</p><ul><li>colors</li><li>fonts</li><li>spacing</li><li>layouts</li><li>responsive design</li></ul><p>Here is an example:</p><pre><code>h1 {\n  color: blue;\n  text-align: center;\n}\n\np {\n  font-size: 18px;\n}</code></pre><p>This code makes the heading blue and centers it. It also changes the paragraph text size.</p>"
    },
    {
      "order": 6,
      "title": "CSS Properties (Intermediate Table)",
      "contentType": "Table",
      "content": "[{\"Property\":\"color\",\"Description\":\"Sets text color\",\"Example\":\"color: red;\",\"__rowNum__\":0},{\"Property\":\"padding\",\"Description\":\"Inner spacing inside an element\",\"Example\":\"padding: 20px;\",\"__rowNum__\":1},{\"Property\":\"margin\",\"Description\":\"Outer spacing outside an element\",\"Example\":\"margin: 10px;\",\"__rowNum__\":2},{\"Property\":\"border\",\"Description\":\"Outline around an element\",\"Example\":\"border: 1px solid black;\",\"__rowNum__\":3},{\"Property\":\"display\",\"Description\":\"Defines layout behavior\",\"Example\":\"display: flex;\",\"__rowNum__\":4}]"
    },
    {
      "order": 7,
      "title": "CSS Deep Quiz",
      "contentType": "Quiz",
      "quiz": {
        "question": "What does the 'display: flex' property do?",
        "explanation": "Flexbox creates a flexible layout that allows items to automatically adjust their size and position.",
        "answers": [
          { "content": "Applies a fixed layout", "isCorrect": false },
          { "content": "Creates a flexible container for alignment", "isCorrect": true },
          { "content": "Changes text color", "isCorrect": false }
        ]
      }
    },
    {
      "order": 8,
      "title": "JavaScript Introduction (Advanced Text)",
      "contentType": "Text",
      "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"heading\",\"attrs\":{\"level\":1},\"content\":[{\"type\":\"text\",\"text\":\"What Is JavaScript?\"}]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"JavaScript is the programming language of the web. Unlike HTML and CSS, which describe structure and style, JavaScript controls behavior—how the website reacts when the user interacts with it. Modern websites rely heavily on JavaScript to create smooth experiences like dropdown menus, animations, form validation, live search, and full applications like YouTube or Gmail.\"}]},{\"type\":\"heading\",\"attrs\":{\"level\":2},\"content\":[{\"type\":\"text\",\"text\":\"How JavaScript Works\"}]},{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"JavaScript runs inside the browser's JavaScript engine (such as V8 for Chrome). When a user loads a page, the browser downloads the JavaScript files and executes them line by line. JavaScript can manipulate HTML elements, respond to user actions, and send data to servers using APIs.\"}]},{\"type\":\"codeBlock\",\"attrs\":{\"language\":\"javascript\"},\"content\":[{\"type\":\"text\",\"text\":\"document.getElementById('title').innerText = 'Hello from JavaScript!';\"}]}]}"
    },
    {
      "order": 9,
      "title": "Advanced JavaScript Quiz",
      "contentType": "Quiz",
      "quiz": {
        "question": "What is the DOM in JavaScript?",
        "explanation": "The DOM (Document Object Model) is a tree-like structure that represents the page's content and allows JavaScript to manipulate elements dynamically.",
        "answers": [
          { "content": "A database used by JavaScript", "isCorrect": false },
          { "content": "A tree structure representing the webpage", "isCorrect": true },
          { "content": "A CSS layout system", "isCorrect": false }
        ]
      }
    }
  ]
}

`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    const section = extractFromJSON(response.text);
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
