import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const userSelector = createFeatureSelector<UserState>('user');
export const selectUsername = createSelector(userSelector, (state) => state.username);
export const selectId = createSelector(userSelector, (state) => state.id);
export const selectName = createSelector(userSelector, (state) => state.name);