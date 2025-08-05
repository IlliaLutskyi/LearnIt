import { configureStore } from "@reduxjs/toolkit";
import CreateCourseReducer from "./slices/CreateCourseSlice";
import ConfirmationReducer from "./slices/ConfirmationFormSlice";
import CourseViewReducer from "./slices/CourseViewSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      CreateCourse: CreateCourseReducer,
      ConfirmationForm: ConfirmationReducer,
      CourseView: CourseViewReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
