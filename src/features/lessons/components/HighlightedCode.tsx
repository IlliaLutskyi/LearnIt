import { DbLesson } from "@/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  lesson: DbLesson;
};
const HighlightedCode = ({ lesson }: Props) => {
  return (
    <SyntaxHighlighter style={styles[lesson.codeStyle as keyof typeof styles]}>
      {lesson.content || ""}
    </SyntaxHighlighter>
  );
};

export default HighlightedCode;
