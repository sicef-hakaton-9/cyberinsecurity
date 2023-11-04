export interface UserState {
    token: string | null;
    username: string | null;
    id: string | null;
    name: string | null;
    error: string | null;
}

export const initialUserState: UserState = {
    token: null,
    username: null,
    id: null,
    name: null,
    error: null
}