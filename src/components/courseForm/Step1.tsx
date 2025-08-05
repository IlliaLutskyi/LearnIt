"use client";
import {
  setTitle,
  setDescription,
  setCategory,
  setSteps,
} from "@/lib/slices/CreateCourseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import InputField from "../common/InputField";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Category } from "@/types/category";
const Step1 = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api("/categories");
      return res.data?.categories;
    },
  });
  const { title, description, category } = useAppSelector(
    (state) => state.CreateCourse
  );
  const dispatch = useAppDispatch();
  function handleNext() {
    dispatch(setSteps({ step1: false, step2: true }));
  }
  return (
    <div className="flex flex-col gap-2 p-4 ">
      <h1 className="text-lg font-bold self-center">General information</h1>
      <section className="grid grid-cols-2 gap-2 ">
        <InputField
          label="Course title"
          type="text"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          inputClassName="shadow-inner text-sm w-full p-2 shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
        />
        <div className="flex flex-col gap-1 ">
          <label htmlFor="categories" className="text-sm">
            Category
          </label>
          <select
            id="categories"
            onChange={(e) => dispatch(setCategory(e.target.value))}
            value={category}
            className="outline-0 shadow-md text-sm w-full p-2  rounded-md"
          >
            {categories?.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <InputField
        label="description"
        type="text"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        multiline={true}
        inputClassName="shadow-inner text-sm w-full h-[15rem]  resize-none  p-2  shadow-md rounded-md outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button
        className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700  duration-500"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
