import { Quiz } from "@/types/quiz";
import { Section } from "@/types/section";
import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ContentType = "Video" | "Text" | "File" | "Quiz";

type CourseStates = {
  steps: { step1: boolean; step2: boolean };
  title: string;
  category: string;
  description: string;
  sections: Section[];
};

const initialState: CourseStates = {
  steps: { step1: true, step2: false },
  title: "",
  category: "",
  description: "",
  sections: [],
};

export const CourseSlice = createSlice({
  name: "CreateCourse",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    loadFromLocalStorage: (state) => {
      const sections = localStorage.getItem("sections");
      const title = localStorage.getItem("title");
      const category = localStorage.getItem("category");
      const description = localStorage.getItem("description");
      const steps = localStorage.getItem("steps");
      if (sections) state.sections = JSON.parse(sections);
      if (title) state.title = title;
      if (description) state.description = description;
      if (steps) state.steps = JSON.parse(steps);
      if (category) state.category = category;
    },
    addSection: (state, action: PayloadAction<Omit<Section, "order">>) => {
      const maxOrder =
        state.sections.length > 0
          ? Math.max(...state.sections.map((section) => section.order))
          : 0;
      const section = { ...action.payload, order: maxOrder + 1 };
      state.sections.push(section);
    },
    shiftSections: (
      state,
      action: PayloadAction<{ newIndex: number; oldIndex: number }>
    ) => {
      state.sections = arrayMove(
        state.sections,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
    deleteSection: (state, action: PayloadAction<number>) => {
      state.sections = state.sections.filter(
        (section) => section.order !== action.payload
      );
    },
    setSteps: (
      state,
      action: PayloadAction<{ step1: boolean; step2: boolean }>
    ) => {
      state.steps = action.payload;
    },
    editSection: (
      state,
      action: PayloadAction<{ order: number; title: string }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.order
      );
      if (section) section.title = action.payload.title;
    },
    shiftLessons: (
      state,
      action: PayloadAction<{
        sectionOrder: number;
        newIndex: number;
        oldIndex: number;
      }>
    ) => {
      const section = state.sections.find(
        (s) => s.order === action.payload.sectionOrder
      );
      if (section) {
        section.lessons = arrayMove(
          section.lessons,
          action.payload.oldIndex,
          action.payload.newIndex
        );
      }
    },
    editQuiz: (
      state,
      action: PayloadAction<{
        sectionOrder: number;
        content: Quiz;
        lessonId: number;
        title: string;
      }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const lesson = section.lessons.find(
          (lesson) => lesson.order === action.payload.lessonId
        );
        if (lesson) {
          lesson.quiz = action.payload.content;
          lesson.title = action.payload.title;
        }
      }
    },

    addQuizToSection: (
      state,
      action: PayloadAction<{
        sectionOrder: number;
        content: Quiz;
        title: string;
      }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const maxOrder =
          section.lessons.length > 0
            ? Math.max(...section.lessons.map((lesson) => lesson.order))
            : 0;

        section.lessons.push({
          order: maxOrder + 1,
          sectionId: action.payload.sectionOrder,
          contentType: "Quiz",
          title: action.payload.title,
          quiz: action.payload.content,
        });
      }
    },
    deleteLesson: (
      state,
      action: PayloadAction<{ sectionOrder: number; lessonId: number }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        section.lessons = section.lessons.filter(
          (lesson) => lesson.order !== action.payload.lessonId
        );
      }
    },
    editLesson: (
      state,
      action: PayloadAction<{
        sectionOrder: number;
        lessonOrder: string;
        title: string;
        content: string;
        contentType: ContentType;
        videoSource?: "Youtube";
      }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const lesson = section.lessons.find(
          (lesson) => lesson.order === Number(action.payload.lessonOrder)
        );
        if (lesson) {
          lesson.title = action.payload.title;
          lesson.content = action.payload.content;
          lesson.contentType = action.payload.contentType;
          lesson.videoSource = action.payload.videoSource;
        }
      }
    },
    addLessonToSection: (
      state,
      action: PayloadAction<{
        sectionOrder: number;
        content: string;
        contentType: ContentType;
        videoSource?: "Youtube";
        title: string;
      }>
    ) => {
      const section = state.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const maxOrder =
          section.lessons.length > 0
            ? Math.max(...section.lessons.map((lesson) => lesson.order))
            : 0;

        section.lessons.push({
          order: maxOrder + 1,
          videoSource: action.payload.videoSource,
          sectionId: action.payload.sectionOrder,
          content: action.payload.content ? action.payload.content : undefined,
          contentType: action.payload.contentType,
          title: action.payload.title,
        });
      }
    },
  },
});

export const {
  addSection,
  setTitle,
  setDescription,
  setCategory,
  setSteps,
  editSection,
  addLessonToSection,
  deleteSection,
  shiftSections,
  shiftLessons,
  loadFromLocalStorage,
  addQuizToSection,
  editQuiz,
  editLesson,
  deleteLesson,
} = CourseSlice.actions;

export default CourseSlice.reducer;
