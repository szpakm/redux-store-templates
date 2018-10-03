declare module "redux-store-templates/task-simple";

import { Reducer } from "redux";
import { ApplyOptions } from "../models";

export interface TaskSimpleState {
  isPending: boolean;
  error: string;
}

/* create reducer */

export interface CreateReducerOptions {
  startOn?: ApplyOptions;
  successOn?: ApplyOptions;
  errorOn?: ApplyOptions;
}

export function createReducer(
  opt: CreateReducerOptions
): Reducer<TaskSimpleState>;

/* create selector */

export interface CreateSelectorOptions {
  fields?: keyof TaskSimpleState | (keyof TaskSimpleState)[];
  selector(state: any): TaskSimpleState;
}

export function createSelector(
  opt: CreateSelectorOptions
): (state: any) => TaskSimpleState;
export function createSelector(
  opt: { fields: keyof TaskSimpleState } & CreateSelectorOptions
): (state: any) => TaskSimpleState[keyof TaskSimpleState]; // TODO - improve
export function createSelector(
  opt: { fields: Array<keyof TaskSimpleState> } & CreateSelectorOptions
): (state: any) => Partial<TaskSimpleState>;
