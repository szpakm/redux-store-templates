declare module 'redux-store-templates/set-simple';

import { Reducer } from "redux";
import { ApplyOptions } from '../models';

export type SetSimpleState<T = string> = T[]; 

/* create reducer */

export interface CreateReducerOptions<T = string> {
  initial?: T[];
  setOn?: ApplyOptions;
  addOn?: ApplyOptions;
  removeOn?: ApplyOptions;
  clearOn?: ApplyOptions;
}

export function createReducer<T = string>(
  opt: CreateReducerOptions<T>
): Reducer<SetSimpleState<T>>
