import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Tabs = "general_info" | "prerequisites" | "skills";
type initialState = {
  isOpen: boolean;
  currentTab: Tabs;
};
const initialStates: initialState = {
  isOpen: false,
  currentTab: "general_info",
};
const EditCourseDetailFormSlice = createSlice({
  name: "EditCourseDetail",
  initialState: initialStates,
  reducers: {
    toggleEditCourseDetailForm: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isOpen = action.payload ? action.payload : !state.isOpen;
    },
    setCurrentTab: (state, action: PayloadAction<Tabs>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { toggleEditCourseDetailForm, setCurrentTab } =
  EditCourseDetailFormSlice.actions;

export default EditCourseDetailFormSlice.reducer;
