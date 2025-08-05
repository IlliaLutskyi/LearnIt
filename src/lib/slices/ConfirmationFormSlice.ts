import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  isOpen: boolean;
  isLoading: boolean;
};

const initialState: States = {
  isLoading: false,
  isOpen: false,
};

export const ConfirmationSlice = createSlice({
  name: "CreateCourse",
  initialState,
  reducers: {
    toggleConfirmationForm: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleConfirmationForm, setIsLoading } =
  ConfirmationSlice.actions;

export default ConfirmationSlice.reducer;
