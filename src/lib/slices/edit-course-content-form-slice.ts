import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Tabs = "general_info" | "prerequisites" | "skills";
type initialState = {
  isOpen: boolean;
};
const initialStates: initialState = {
  isOpen: false,
};
const EditCourseContentFormSlice = createSlice({
  name: "EditCourseDetail",
  initialState: initialStates,
  reducers: {
    toggleEditCourseContentForm: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isOpen = action.payload ? action.payload : !state.isOpen;
    },
  },
});

export const { toggleEditCourseContentForm } =
  EditCourseContentFormSlice.actions;

export default EditCourseContentFormSlice.reducer;
