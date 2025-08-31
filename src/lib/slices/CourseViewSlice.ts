import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  currentSection: {
    id: number | null;
    sectionGroupId: number | null;
  };
  currentLessonViewId: number | null;
};
const initialState: States = {
  currentSection: {
    id: null,
    sectionGroupId: null,
  },
  currentLessonViewId: null,
};

export const CourseViewSlice = createSlice({
  name: "CourseView",
  initialState,
  reducers: {
    setCurrentSection: (
      state,
      action: PayloadAction<{
        id: number;
        sectionGroupId: number;
      }>
    ) => {
      state.currentSection = action.payload;
    },
    setCurrentLessonViewId: (state, action: PayloadAction<number>) => {
      state.currentLessonViewId = action.payload;
    },
  },
});

export const { setCurrentSection, setCurrentLessonViewId } =
  CourseViewSlice.actions;

export default CourseViewSlice.reducer;
