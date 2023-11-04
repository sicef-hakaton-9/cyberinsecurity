import { createAction, props } from "@ngrx/store";
import { Jwt, LoginDTO, SignupDTO, User } from "src/app/models";

export const LoginUser = createAction(
    '[User] Login User',
    props<{ user: LoginDTO }>()
);

export const LogoutUser = createAction(
    '[User] Logout User'
);

export const LoginUserSuccess = createAction(
    '[User] Login User Success',
    props<{ token: Jwt }>()
);

export const LoginUserFailure = createAction(
    '[User] Login User Failure',
    props<{ error: string }>()
);

export const RegisterUser = createAction(
    '[User] Register User',
    props<{ user: SignupDTO }>()
);

export const RegisterUserSuccess = createAction(
    '[User] Register User Success',
    props<{ token: Jwt }>()
);

export const RegisterUserFailure = createAction(
    '[User] Register User Failure',
    props<{ error: string }>()
);