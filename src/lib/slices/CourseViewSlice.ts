import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $Enums } from "../../../prisma/generated/prisma";
import { DBLesson } from "@/types/dbLesson";
import { DBSection } from "@/types/dbSection";
type Section = DBSection;
type Lesson = DBLesson;
type States = {
  currentSection: Section | null;
  currentLesson: Lesson | null;
};

const initialState: States = {
  currentSection: null,
  currentLesson: null,
};

export const CourseViewSlice = createSlice({
  name: "CourseView",
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<Section>) => {
      state.currentSection = action.payload;
    },
    setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
      state.currentLesson = action.payload;
    },
  },
});

export const { setCurrentSection, setCurrentLesson } = CourseViewSlice.actions;

export default CourseViewSlice.reducer;
