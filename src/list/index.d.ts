declare module "redux-store-templates/list";

import { Reducer } from "redux";
import { ApplyOptions } from '../models';

export interface ListState<T = any> {
  byId: { [key: string]: T };
  ids: string[];
}

/* create reducer */

export interface CreateReducerOptions<T = any> {
  idName: string;
  initialItems?: T[];
  setOn?: ApplyOptions;
  addOn?: ApplyOptions;
  removeOn?: ApplyOptions;
  clearOn?: ApplyOptions;
}

export function createReducer<T = any>(
  opt: CreateReducerOptions<T>
): Reducer<ListState<T>>;

/* create selector */

export interface CreateSelectorAllOptions {
  selector(state: any): ListState;
}
export function createSelectorAll<T = any>(
  opt: CreateSelectorAllOptions
): (state: any) => T[];

export interface CreateSelectorByIdOptions {
  selector(state: any): ListState;
}
export function createSelectorById<T = any>(
  opt: CreateSelectorByIdOptions
): (state: any) => T;
