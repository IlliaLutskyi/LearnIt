import { configureStore } from "@reduxjs/toolkit";
import CreateCourseReducer from "./slices/create-course-slice";
import ConfirmationReducer from "./slices/confirmation-form-slice";
import CourseViewReducer from "./slices/course-view-slice";
import EditCourseDetailReducer from "./slices/edit-course-detail-form-slice";
import AddOrEditCategoryReducer from "./slices/add-or-edit-category-form-slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      CreateCourse: CreateCourseReducer,
      ConfirmationForm: ConfirmationReducer,
      CourseView: CourseViewReducer,
      EditCourseDetail: EditCourseDetailReducer,
      AddOrEditCategoryForm: AddOrEditCategoryReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
