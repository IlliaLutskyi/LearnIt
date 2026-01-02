import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  currentSectionId: string | null;
  currentLessonViewId: string | null;
};
const initialState: States = {
  currentSectionId: null,
  currentLessonViewId: null,
};

export const CourseViewSlice = createSlice({
  name: "CourseView",
  initialState,
  reducers: {
    setCurrentSectionId: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },
    setCurrentLessonViewId: (state, action: PayloadAction<string>) => {
      state.currentLessonViewId = action.payload;
    },
  },
});

export const { setCurrentSectionId, setCurrentLessonViewId } =
  CourseViewSlice.actions;

export default CourseViewSlice.reducer;
