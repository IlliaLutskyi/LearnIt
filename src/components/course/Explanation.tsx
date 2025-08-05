"use client";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type Props = {
  content: string;
};
const Explanation = ({ content }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      className="w-full"
    >
      <div className="flex items-center justify-center">
        <CollapsibleTrigger>
          <h1 className="text-sm text-purple-500 hover:text-purple-700 ">
            See explanation
          </h1>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex items-center justify-center">
        <p className="text-pretty whitespace-pre-wrap break-words ">
          {content}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Explanation;
