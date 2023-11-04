import { UserState, initialUserState } from "./user/user.state";

export interface AppState{
    userState: UserState;
}

export const initialAppState = {
    userState: initialUserState,
}