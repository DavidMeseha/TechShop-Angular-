import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import UserService from '../../services/auth.services';
import * as UserStoreActions from './user.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export default class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStoreActions.login),
      mergeMap((props) =>
        this.userService
          .login({ email: props.email, password: props.password })
          .pipe(
            map((response) => {
              console.log(response);
              localStorage.setItem('access', response.token);
              localStorage.setItem('createdAt', new Date().toISOString());
              this.router.navigate(['/']);
              return UserStoreActions.loginSuccess({
                user: response.user,
              });
            }),
            catchError((error: HttpErrorResponse) => {
              const message =
                error.status === 401
                  ? 'Wrong email or password'
                  : 'Somthing wrong happend';
              return of(UserStoreActions.loginFailure({ error: message }));
            })
          )
      )
    );
  });

  check$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStoreActions.checkToken),
      mergeMap(() =>
        this.userService.checkToken().pipe(
          map((response) => {
            UserStoreActions.userActions();
            return UserStoreActions.loginSuccess({
              user: response,
            });
          })
        )
      )
    );
  });

  allActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStoreActions.userActions),
      mergeMap(() =>
        this.userService.allActions().pipe(
          map((response) =>
            UserStoreActions.userActionsSuccess({
              ...response,
            })
          ),
          catchError((error) =>
            of(UserStoreActions.userActionsFailure(error.message))
          )
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStoreActions.logout),
      mergeMap(() =>
        this.userService.logout().pipe(
          map((response) => {
            localStorage.setItem('access', response.token);
            localStorage.removeItem('createdAt');
            return UserStoreActions.logoutComplete({
              user: response.user,
            });
          }),
          catchError((error) =>
            of(UserStoreActions.loginFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
