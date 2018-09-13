
declare module 'redux-store-templates/value';

import { Reducer } from 'redux';
import { ApplyOptions } from '../models';

export type ValueState<T = any> = T;

/* create reducer */

export interface ValueOptions<T = any> {
  initial?: T;
  setOn?: ApplyOptions;
  resetOn?: ApplyOptions;
}


export function createReducer<T=any>(opt: ValueOptions<T>): Reducer<ValueState<T>>;

/* create selector */

export interface CreateSelectorOptions {
  selector(state: any): ValueState;
}

export function createSelector(opt: CreateSelectorOptions): (state:any) => ValueState;
