import {
  getTodos,
  updateTodo,
  deleteTodo,
  checkStep,
  addNewTodo,
  checkTodo,
  createEmptyTodo,
  createEmptyStep,
  validateTodo,
  validateStep,
} from "./todos";

import {
  getTages,
  updateTag,
  deleteTag,
  addNewTag,
  createEmptyTag,
} from "./tags";

import { addInterval, getInterval, getIntervals } from "./pomodoro";

import {
  getHabits,
  updateHabit,
  addNewHabit,
  removeHabit,
  addEntry,
  removeEntry,
} from "./habits";

import ProvideAuth from "./ProvideAuth";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./auth";

// Types
import type { Todo, TodoWithTag, Step, TodoError, StepError } from "./todos";
import type { Tag, TagError } from "./tags";
import type { PomodoroInterval, IntervalWithTodo } from "./pomodoro";
import type { Habit, HabitError } from "./habits";
import type { User, AuthContext, UserError } from "./auth";

export {
  getTodos,
  getTages,
  updateTodo,
  deleteTodo,
  checkTodo,
  deleteTag,
  updateTag,
  checkStep,
  addNewTodo,
  addNewTag,
  createEmptyTodo,
  createEmptyStep,
  createEmptyTag,
  PrivateRoute,
  ProvideAuth,
  useAuth,
  validateTodo,
  validateStep,
  addInterval,
  getInterval,
  getIntervals,
  getHabits,
  updateHabit,
  addNewHabit,
  removeHabit,
  addEntry,
  removeEntry,
};

export type {
  Todo,
  TodoWithTag,
  Step,
  Tag,
  TagError,
  PomodoroInterval,
  User,
  AuthContext,
  TodoError,
  StepError,
  UserError,
  Habit,
  HabitError,
  IntervalWithTodo,
};
