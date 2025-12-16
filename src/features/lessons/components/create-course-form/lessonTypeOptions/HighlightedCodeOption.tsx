import { Input } from "@/components/common";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { UseFormRegister } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs";
type Props = {
  content: string;
  codeStyle: string | undefined;
  register: UseFormRegister<CreateLesson>;
  error: string | undefined;
};
const HighlightedCodeOption = ({
  codeStyle,
  content,
  register,
  error,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="code_style" className="text-xs">
          Code Style
        </label>
        <select
          id="code_style"
          {...register("codeStyle")}
          className="input-field"
        >
          {Object.keys(styles).map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-2 gap-2">
        <Input
          label="Code"
          {...register("content")}
          error={error}
          className="input-field h-[11rem] resize-none"
          multiline
        />
        <div className="flex flex-col gap-1 overflow-y-auto max-h-[12rem]">
          <label className="text-xs">Preview</label>
          {content && (
            <SyntaxHighlighter style={styles[codeStyle as keyof typeof styles]}>
              {content}
            </SyntaxHighlighter>
          )}
        </div>
      </section>
    </div>
  );
};

export default HighlightedCodeOption;
