"use client";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";

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
          <h1 className="text-xs text-accent hover:text-secondary-accent duration-500">
            {isOpen ? "Hide explanation" : "Show explanation"}
          </h1>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex items-center justify-center">
        <p className="text-xs text-muted-foreground text-pretty whitespace-pre-wrap break-words">
          {content}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Explanation;
