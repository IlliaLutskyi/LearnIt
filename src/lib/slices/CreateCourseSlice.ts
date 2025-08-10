import { Quiz } from "@/types/quiz";
import { Section } from "@/types/section";
import { SectionGroup } from "@/types/sectionGroup";
import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ContentType = "Video" | "Text" | "File" | "Quiz";

type CourseStates = {
  steps: { step1: boolean; step2: boolean };
  title: string;
  category: string;
  description: string;
  sectionGroups: SectionGroup[];
};

const initialState: CourseStates = {
  steps: { step1: true, step2: false },
  title: "",
  category: "",
  description: "",
  sectionGroups: [],
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
    createSectionGroup: (state) => {
      const maxOrder =
        state.sectionGroups.length > 0
          ? Math.max(
              ...state.sectionGroups.map((sectionGroup) => sectionGroup.order)
            )
          : 0;
      state.sectionGroups.push({
        title: `SectionGroup ${maxOrder + 1}`,
        sections: [],
        order: maxOrder + 1,
      });
    },
    shiftSectionGroup: (
      state,
      action: PayloadAction<{ newIndex: number; oldIndex: number }>
    ) => {
      state.sectionGroups = arrayMove(
        state.sectionGroups,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
    deleteSectionGroup: (state, action: PayloadAction<number>) => {
      state.sectionGroups = state.sectionGroups.filter(
        (sectionGroup) => sectionGroup.order !== action.payload
      );
    },
    renameSectionGroup: (
      state,
      action: PayloadAction<{ sectionGroupOrder: number; title: string }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      sectionGroup.title = action.payload.title;
    },

    loadFromLocalStorage: (state) => {
      const course = localStorage.getItem("course")
        ? JSON.parse(localStorage.getItem("course") as string)
        : null;
      if (course) {
        state.title = course.title;
        state.category = course.category;
        state.description = course.description;
        state.sectionGroups = course.sectionGroups;
      }
    },
    addSectionToSectionGroup: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const maxOrder =
        sectionGroup.sections.length > 0
          ? Math.max(...sectionGroup.sections.map((section) => section.order))
          : 0;
      const section: Section = {
        title: `Section ${maxOrder + 1}`,
        order: maxOrder + 1,
        lessons: [],
        sectionGroupId: action.payload.sectionGroupOrder,
      };
      sectionGroup.sections.push(section);
    },
    shiftSection: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
        newIndex: number;
        oldIndex: number;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      sectionGroup.sections = arrayMove(
        sectionGroup.sections,
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
    deleteSection: (
      state,
      action: PayloadAction<{ sectionGroupOrder: number; sectionOrder: number }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      sectionGroup.sections = sectionGroup.sections.filter(
        (section) => section.order !== action.payload.sectionOrder
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
      action: PayloadAction<{
        sectionGroupOrder: number;
        order: number;
        title: string;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
        (section) => section.order === action.payload.order
      );
      if (!section) return;
      section.title = action.payload.title;
    },
    shiftLessons: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
        sectionOrder: number;
        newIndex: number;
        oldIndex: number;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
        (section) => section.order === action.payload.sectionOrder
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
        sectionGroupOrder: number;
        sectionOrder: number;
        content: Quiz;
        lessonId: number;
        title: string;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
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
        sectionGroupOrder: number;
        sectionOrder: number;
        content: Quiz;
        title: string;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const maxOrder =
          section.lessons.length > 0
            ? Math.max(...section.lessons.map((lesson) => lesson.order))
            : 0;

        section.lessons.push({
          sectionGroupId: action.payload.sectionGroupOrder,
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
      action: PayloadAction<{
        sectionGroupOrder: number;
        sectionOrder: number;
        lessonId: number;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
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
        sectionGroupOrder: number;
        sectionOrder: number;
        lessonOrder: string;
        title: string;
        content: string;
        contentType: ContentType;
        videoSource?: "Youtube";
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
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
        sectionGroupOrder: number;
        sectionOrder: number;
        content: string;
        contentType: ContentType;
        videoSource?: "Youtube";
        title: string;
      }>
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      const section = sectionGroup.sections.find(
        (section) => section.order === action.payload.sectionOrder
      );
      if (section) {
        const maxOrder =
          section.lessons.length > 0
            ? Math.max(...section.lessons.map((lesson) => lesson.order))
            : 0;

        section.lessons.push({
          sectionGroupId: action.payload.sectionGroupOrder,
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
  addSectionToSectionGroup,
  setTitle,
  setDescription,
  setCategory,
  setSteps,
  editSection,
  addLessonToSection,
  deleteSection,
  renameSectionGroup,
  shiftSection,
  deleteSectionGroup,
  shiftLessons,
  loadFromLocalStorage,
  addQuizToSection,
  editQuiz,
  shiftSectionGroup,
  createSectionGroup,
  editLesson,
  deleteLesson,
} = CourseSlice.actions;

export default CourseSlice.reducer;
