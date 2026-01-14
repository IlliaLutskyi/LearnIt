import { createSlug } from "@/features/courses/utils/create-slug";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";
import {
  Prerequisite,
  Quiz,
  Section,
  SectionGroup,
  Skill,
  Lesson,
} from "@/types/create-course";
import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Step = { step: number; title: string; active: boolean };
type CourseStates = {
  poster: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  steps: Step[];
  prerequisites: Prerequisite[];
  skills: Skill[];
  sectionGroups: SectionGroup[];
};

const initialState: CourseStates = {
  poster: "",
  title: "",
  slug: "",
  category: "",
  description: "",
  steps: [
    { step: 1, title: "Genereral Information", active: true },
    { step: 2, title: "Set up prerequisites", active: false },
    { step: 3, title: "Learnining outcomes", active: false },
    { step: 4, title: "Content creation", active: false },
  ],
  prerequisites: [],
  skills: [],
  sectionGroups: [],
};

export const CourseSlice = createSlice({
  name: "CreateCourse",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.slug = createSlug(action.payload);
    },
    setPoster: (state, action: PayloadAction<string>) => {
      state.poster = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    addSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },

    addPrerequisites: (state, action: PayloadAction<Prerequisite[]>) => {
      state.prerequisites = action.payload;
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
        slug: `sectionGroup-${maxOrder + 1}`,
        sections: [],
        state: "Ready",
        showSectionsOnly: false,
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
    setProperties: (
      state,
      action: PayloadAction<
        { sectionGroupOrder: number } & SectionGroupProperties
      >
    ) => {
      const sectionGroup = state.sectionGroups.find(
        (sectionGroup) =>
          sectionGroup.order === action.payload.sectionGroupOrder
      );
      if (!sectionGroup) return;
      sectionGroup.title = action.payload.title;
      sectionGroup.slug = createSlug(action.payload.title);
      sectionGroup.showSectionsOnly = action.payload.showSectionsOnly;
      sectionGroup.state = action.payload.state;
    },

    loadContent: (state) => {
      const sectionGroups = localStorage.getItem("sectionGroups")
        ? JSON.parse(localStorage.getItem("sectionGroups") as string)
        : null;
      if (sectionGroups) state.sectionGroups = sectionGroups;
    },
    addSectionToSectionGroup: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
        title?: string;
        lessons?: Lesson[];
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
        title: action.payload.title
          ? action.payload.title
          : `Section ${maxOrder + 1}`,
        order: maxOrder + 1,
        slug: action.payload.title
          ? createSlug(action.payload.title)
          : `section-${maxOrder + 1}`,
        lessons: action.payload.lessons
          ? action.payload.lessons.map((lesson) => {
              return {
                ...lesson,
                sectionGroupOrder: action.payload.sectionGroupOrder,
                sectionOrder: maxOrder + 1,
              };
            })
          : [],
        sectionGroupOrder: action.payload.sectionGroupOrder,
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
    setNextStep: (state, action: PayloadAction<{ nextStep: number }>) => {
      const nextStep = state.steps.find(
        (step) => step.step === action.payload.nextStep
      );
      const currentStep = state.steps.find((step) => step.active === true);
      if (!currentStep || !nextStep) return;
      currentStep.active = false;
      nextStep.active = true;
    },
    setPreviousStep: (
      state,
      action: PayloadAction<{ currentStep: number }>
    ) => {
      const currentStep = state.steps.find(
        (step) => step.step === action.payload.currentStep
      );
      const previousStep = state.steps.find(
        (step) => step.step === action.payload.currentStep - 1
      );
      if (!previousStep || !currentStep) return;
      currentStep.active = false;
      previousStep.active = true;
    },
    editSection: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
        sectionOrder: number;
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

      if (!section) return;

      section.title = action.payload.title;
      section.slug = createSlug(action.payload.title);
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
        quiz: Quiz;
        lessonOrder: number;
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
      if (!section) return;

      const lesson = section.lessons.find(
        (lesson) => lesson.order === action.payload.lessonOrder
      );

      if (!lesson) return;
      lesson.quiz = action.payload.quiz;
      lesson.title = action.payload.title;
    },

    addQuizToSection: (
      state,
      action: PayloadAction<{
        sectionGroupOrder: number;
        sectionOrder: number;
        quiz: Quiz;
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

      if (!section) return;

      const maxOrder =
        section.lessons.length > 0
          ? Math.max(...section.lessons.map((lesson) => lesson.order))
          : 0;

      section.lessons.push({
        sectionGroupOrder: action.payload.sectionGroupOrder,
        order: maxOrder + 1,
        sectionOrder: action.payload.sectionOrder,
        contentType: "Quiz",
        title: action.payload.title,
        quiz: action.payload.quiz,
      });
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

      if (!section) return;

      section.lessons = section.lessons.filter(
        (lesson) => lesson.order !== action.payload.lessonId
      );
    },
    editLesson: (
      state,
      action: PayloadAction<
        {
          sectionGroupOrder: number;
          sectionOrder: number;
          lessonOrder: number;
        } & CreateLesson
      >
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
          lesson.codeStyle = action.payload.codeStyle;
        }
      }
    },
    addLessonToSection: (
      state,
      action: PayloadAction<
        {
          sectionGroupOrder: number;
          sectionOrder: number;
        } & CreateLesson
      >
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
          sectionGroupOrder: action.payload.sectionGroupOrder,
          order: maxOrder + 1,
          videoSource: action.payload.videoSource,
          sectionOrder: action.payload.sectionOrder,
          content: action.payload.content ? action.payload.content : undefined,
          contentType: action.payload.contentType,
          codeStyle: action.payload.codeStyle,
          title: action.payload.title,
        });
      }
    },
  },
});

export const {
  setPoster,
  addSectionToSectionGroup,
  addPrerequisites,
  setTitle,
  setDescription,
  addSkills,
  setCategory,
  setNextStep,
  setPreviousStep,
  editSection,
  addLessonToSection,
  deleteSection,
  shiftSection,
  setProperties,
  deleteSectionGroup,
  shiftLessons,
  loadContent,
  addQuizToSection,
  editQuiz,
  shiftSectionGroup,
  createSectionGroup,
  editLesson,
  deleteLesson,
} = CourseSlice.actions;

export default CourseSlice.reducer;
