import { useState } from "react";
import { Preriquisite } from "@/types/prerequisites";
import { Quiz } from "@/types/quiz";
import { Section } from "@/types/section";
import { SectionGroup } from "@/types/sectionGroup";
import { Skill } from "@/types/skill";
import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

type ContentType = "Video" | "Text" | "File" | "Quiz";
type Step = { step: number; title: string; active: boolean };
type CourseStates = {
  steps: Step[];
  prerequisites: Preriquisite[];
  skills: Skill[];
  title: string;
  category: string;
  description: string;
  sectionGroups: SectionGroup[];
};

const initialState: CourseStates = {
  steps: [
    { step: 1, title: "Genereral Information", active: true },
    { step: 2, title: "Set up prerequisites", active: false },
    { step: 3, title: "Learining outcomes", active: false },
    { step: 4, title: "Content creation", active: false },
  ],
  prerequisites: [],
  skills: [],
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
    addSkill: (state) => {
      const maxId =
        state.skills.length > 0
          ? Math.max(...state.skills.map((skill) => skill.id))
          : 0;
      state.skills.push({ id: maxId + 1, content: `Skill ${maxId + 1}` });
    },
    editSkill: (
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const skill = state.skills.find(
        (skill) => skill.id === action.payload.id
      );
      if (!skill) return;
      skill.content = action.payload.content;
    },
    deleteSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    addPreriquisite: (state) => {
      const maxId =
        state.prerequisites.length > 0
          ? Math.max(
              ...state.prerequisites.map((prerequisite) => prerequisite.id)
            )
          : 0;
      state.prerequisites.push({
        id: maxId + 1,
        content: `Prerequisite ${maxId + 1}`,
      });
    },
    editPreriquite: (
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const prerequisite = state.prerequisites.find(
        (prerequisite) => prerequisite.id === action.payload.id
      );
      if (!prerequisite) return;
      prerequisite.content = action.payload.content;
    },
    deletePreriquite: (state, action: PayloadAction<number>) => {
      state.prerequisites = state.prerequisites.filter(
        (prerequisite) => prerequisite.id !== action.payload
      );
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
        state.skills = course.skills;
        state.description = course.description;
        state.sectionGroups = course.sectionGroups;
        state.prerequisites = course.prerequisites;
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
    setNextStep: (state, action: PayloadAction<{ currentStep: number }>) => {
      const currentStep = state.steps.find(
        (step) => step.step === action.payload.currentStep
      );
      const nextStep = state.steps.find(
        (step) => step.step === action.payload.currentStep + 1
      );
      if (!nextStep || !currentStep) return;
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
        quiz: Quiz;
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
          lesson.quiz = action.payload.quiz;
          lesson.title = action.payload.title;
        }
      }
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
          quiz: action.payload.quiz,
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
  addPreriquisite,
  addSkill,
  deleteSkill,
  editSkill,
  deletePreriquite,
  editPreriquite,
  setTitle,
  setDescription,
  setCategory,
  setNextStep,
  setPreviousStep,
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
