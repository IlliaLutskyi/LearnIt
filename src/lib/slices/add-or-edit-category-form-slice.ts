import { DbCategory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  isOpen: boolean;
  category?: DbCategory;
};

const initialState: States = {
  isOpen: false,
};

export const AddOrEditFormSlice = createSlice({
  name: "CreateCourse",
  initialState,
  reducers: {
    toggleAddOrEditCategoryForm: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isOpen = action?.payload ? action.payload : !state.isOpen;
    },
    setCategory: (state, action: PayloadAction<DbCategory | undefined>) => {
      state.category = action.payload;
    },
  },
});

export const { toggleAddOrEditCategoryForm, setCategory } =
  AddOrEditFormSlice.actions;

export default AddOrEditFormSlice.reducer;
