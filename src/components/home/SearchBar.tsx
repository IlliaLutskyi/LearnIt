import { useState } from "react";
import { Loader } from "../common";
import { IoIosSearch } from "react-icons/io";
import Suggestion from "./Suggestion";
import { useQuery } from "@tanstack/react-query";
import { searchCourse } from "@/features/courses/queries/seach-course";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../ui/command";
import { AnimatePresence } from "framer-motion";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["courses", keyword],
    queryFn: async ({ signal }) => {
      return await searchCourse(keyword, signal, { limit: 5 });
    },
    enabled: !!keyword,
  });

  return (
    <div className="flex items-center">
      <button onClick={() => setIsOpen(true)}>
        <IoIosSearch size={20} className="text-accent-foreground" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="sm:w-1/2 w-5/6"
          >
            <CommandInput
              placeholder="Type a course name"
              onValueChange={(search) => setKeyword(search)}
              value={keyword}
            />

            <CommandList>
              {!data && (
                <CommandEmpty>
                  {isLoading ? <Loader /> : "No results found."}
                </CommandEmpty>
              )}

              {data && (
                <section className="flex flex-col gap-4 p-4">
                  {data?.courses.map((course) => {
                    return (
                      <Suggestion
                        course={course}
                        setIsOpen={setIsOpen}
                        key={course.id}
                      />
                    );
                  })}
                </section>
              )}
            </CommandList>
          </CommandDialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
