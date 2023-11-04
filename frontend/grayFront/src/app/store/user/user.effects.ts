import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { LoginUser, LoginUserFailure, LoginUserSuccess, RegisterUser, RegisterUserFailure, RegisterUserSuccess } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { LoginService } from "src/app/log-in/login.service";
import { SignUpService } from "src/app/sign-up/sign-up.service";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, 
        private loginService: LoginService,
        private signupService: SignUpService ) { }
        jwtHelper = new JwtHelperService();


    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginUser),
            switchMap((action) => {
                return this.loginService.login(action.user).pipe(
                    map((jwt) => {
                        return LoginUserSuccess({ token: jwt });
                    }),
                    catchError((error) => 
                        of(LoginUserFailure({ error }))
                    )
                );
            })
        );
    });

    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RegisterUser),
            switchMap((action) =>  {
                return this.signupService.signUp(action.user).pipe(
                map((jwt) => {
                    const user = this.jwtHelper.decodeToken(jwt.access_token).user;
                    return RegisterUserSuccess({ token: jwt })
                }),
                catchError((error) => of(RegisterUserFailure({ error })))
            )
        })
        )
    })
}