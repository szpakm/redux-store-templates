declare module "redux-store-templates/toggle";

import { Reducer } from "redux";
import { ApplyOptions } from "../models";

export type ToggleState = boolean;

/* create reducer */

export interface ToggleOptions {
  initial?: boolean;
  toggleOn?: ApplyOptions;
  makeTrueOn?: ApplyOptions;
  makeFalseOn?: ApplyOptions;
  setOn?: ApplyOptions;
  resetOn?: ApplyOptions;
}

export function createReducer(opt: ToggleOptions): Reducer<ToggleState>;

/* create selector */

export interface CreateSelectorOptions {
  selector(state: any): ToggleState;
}

export function createSelector(
  opt: CreateSelectorOptions
): (state: any) => ToggleState;
