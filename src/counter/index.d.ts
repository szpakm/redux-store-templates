declare module "redux-store-templates/counter";

import { Reducer } from "redux";
import { ApplyOptions } from '../models';

export type CounterState = number;

/* crate reducer */

export interface CreateReducerOptions {
  initial:number,
  incrementOn?:ApplyOptions;
  decrementOn?:ApplyOptions;
  incrementByOn?:ApplyOptions;
  decrementByOn?:ApplyOptions;
  setOn?:ApplyOptions;
  resetOn?:ApplyOptions;
}

export function createReducer(opt: CreateReducerOptions): Reducer<CounterState>;

/* create selector */

export interface CreateSelectorOptions {
  selector(state: any): CounterState;
}

export function createSelector(
  opt: CreateSelectorOptions
): (state: any) => CounterState;
