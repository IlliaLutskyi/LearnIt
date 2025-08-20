import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  currentSectionId: number | null;
  currentLessonViewId: number | null;
};
const initialState: States = {
  currentSectionId: null,
  currentLessonViewId: null,
};

export const CourseViewSlice = createSlice({
  name: "CourseView",
  initialState,
  reducers: {
    setCurrentSectionId: (state, action: PayloadAction<number>) => {
      state.currentSectionId = action.payload;
    },
    setCurrentLessonViewId: (state, action: PayloadAction<number>) => {
      state.currentLessonViewId = action.payload;
    },
  },
});

export const { setCurrentSectionId, setCurrentLessonViewId } =
  CourseViewSlice.actions;

export default CourseViewSlice.reducer;
