import { useState } from "react";
import { Input, Loader } from "../common";
import { IoIosSearch } from "react-icons/io";
import Suggestions from "./Suggestions";
import { useQuery } from "@tanstack/react-query";
import { searchCourse } from "@/features/courses/queries/seach-course";
import { isAxiosError } from "axios";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["courses", keyword],
    queryFn: async ({ signal }) => {
      return await searchCourse(keyword, signal, { limit: 5 });
    },
    enabled: !!keyword,
  });

  return (
    <div className="grow relative">
      <label htmlFor="searchbar" className="absolute top-3 right-2">
        <IoIosSearch size={20} className="text-foreground" />
      </label>

      <Input
        id="searchbar"
        onChange={(e) => setKeyword(e.target.value)}
        className="input-field"
        placeholder="Search..."
      />

      {isSuccess && keyword && !isLoading && (
        <Suggestions courses={data.courses} />
      )}

      {isLoading && (
        <div className="absolute -bottom-14 left-0 w-full grid place-content-center p-4 bg-card text-card-foreground ring-1 ring-input rounded-sm">
          <Loader />
        </div>
      )}

      {!isSuccess && keyword && !isLoading && (
        <div className="absolute -bottom-14 left-0 w-full grid place-content-center p-4 bg-card text-card-foreground ring-1 ring-input rounded-sm">
          <p className="text-sm">
            {isAxiosError(error) && error.response?.data?.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
