"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/hooks";
import { convertLessonUrl } from "@/features/lessons/utils/convertLessonUrl";
import Quiz from "@/features/quizzes/components/create-course-form/Quiz";
import SyntaxHighlighter from "react-syntax-highlighter";
import { AnimatePresence } from "framer-motion";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/types/create-course";
import PreviewSidebar from "./PreviewSidebar";
import { isJsonValid } from "@/utils/isJsonValid";
import { convertTableToHtml } from "@/utils/convertTableToHtml";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: () => void;
};
const Preview = ({ isOpen, setIsOpen, onSave }: Props) => {
  const { sectionGroups } = useAppSelector((store) => store.CreateCourse);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<Section>();

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentSection]);

  useEffect(() => {
    if (sectionGroups?.[0]?.sections?.[0])
      setCurrentSection(sectionGroups[0].sections[0]);
  }, [sectionGroups]);

  function handleSave() {
    if (onSave) onSave();
    setIsOpen(false);
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-3/4">
            <div className="flex flex-col gap-4 py-4">
              <DialogTitle className="text-center text-lg">Preview</DialogTitle>

              <section className="grow grid grid-cols-[1fr_4fr] justify-center">
                <PreviewSidebar
                  sectionGroups={sectionGroups}
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
                />

                <div
                  ref={containerRef}
                  className="flex flex-col gap-2 overflow-y-auto max-h-[500px] w-full px-3 py-2"
                  id="styledScrollbar"
                >
                  {!currentSection && (
                    <p className="text-sm text-center">
                      Select a section to preview
                    </p>
                  )}

                  {currentSection?.lessons.map((lesson) => {
                    if (lesson.contentType === "Table")
                      return (
                        <div
                          className="content *:text-foreground"
                          key={lesson.order}
                          dangerouslySetInnerHTML={{
                            __html:
                              lesson.content && isJsonValid(lesson.content)
                                ? convertTableToHtml(JSON.parse(lesson.content))
                                : "",
                          }}
                        />
                      );

                    if (lesson.contentType === "Text")
                      return (
                        <div
                          className="content *:text-foreground"
                          key={lesson.order}
                          dangerouslySetInnerHTML={{
                            __html: lesson.content || "",
                          }}
                        />
                      );

                    if (lesson.contentType === "Video")
                      return (
                        <iframe
                          src={convertLessonUrl(
                            lesson.content!,
                            lesson.videoSource!,
                          )}
                          key={lesson.order}
                          allowFullScreen
                          className="w-full aspect-video my-5"
                        />
                      );

                    if (lesson.contentType === "Quiz")
                      return <Quiz key={lesson.order} quiz={lesson.quiz!} />;

                    if (lesson.contentType === "Image")
                      return (
                        <img
                          src={lesson.content ? lesson.content : ""}
                          alt={lesson.title}
                          width={600}
                          className="rounded-sm"
                          key={lesson.order}
                        />
                      );

                    if (lesson.contentType === "HighlightedCode") {
                      return (
                        <div key={lesson.order}>
                          <SyntaxHighlighter
                            style={
                              styles[lesson.codeStyle as keyof typeof styles]
                            }
                            wrapLongLines
                          >
                            {lesson.content || ""}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }
                    if (lesson.contentType === "Markdown") {
                      return (
                        <div
                          className="content *:text-foreground"
                          key={lesson.order}
                          dangerouslySetInnerHTML={{
                            __html: lesson.content || "",
                          }}
                        />
                      );
                    }
                  })}
                </div>
              </section>
              <section className="flex justify-end px-4">
                <button
                  onClick={handleSave}
                  className="self-end bg-accent text-accent-foreground text-sm p-2 hover:scale-95 duration-400 rounded-sm"
                >
                  Save
                </button>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Preview;
