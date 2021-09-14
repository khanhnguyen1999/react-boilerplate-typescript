import { Reducer, combineReducers } from "redux";

import error from "./statics/error";
import loading from "./statics/loading";

export interface InjectedReducers {
  [key: string]: Reducer;
}

export function createReducer(injectedReducers?: InjectedReducers) {
  return combineReducers({
    error,
    loading,
    ...injectedReducers,
  });
}
