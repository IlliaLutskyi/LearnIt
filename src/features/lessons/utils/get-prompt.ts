import { ContentType } from "@/types/create-course";

type Props = {
  description?: string;

  contentType: ContentType;
};
export function getPropmt({ description, contentType }: Props) {
  if (contentType === "Text")
    return `Based on this description ${description}, generate a lesson and return it in json format. The response has to be valid json and be like this example: 
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
  if (contentType === "Quiz") {
    return ``;
  }
  return "";
}
