import { createAction, props } from '@ngrx/store';
import { User, UserAllActions } from '../../../types';

export const login = createAction(
  '[user] Login',
  props<{ email: string; password: string }>()
);

export const checkToken = createAction('[user] Check');

export const loginSuccess = createAction(
  '[user] Login Success',
  props<{ user: User | null }>()
);

export const loginFailure = createAction(
  '[user] Login Failure',
  props<{ error: string }>()
);

export const userActions = createAction('[user] All Actions');
export const userActionsFailure = createAction(
  '[user] All Actions Failed',
  props<{ error: string }>()
);
export const userActionsSuccess = createAction(
  '[user] All Actions Success',
  props<UserAllActions>()
);

export const setUser = createAction('[user] Set Data', props<User>());

// export const refreshToken = createAction('[user] Refresh Token');

// export const refreshTokenSuccess = createAction(
//   '[user] Refresh Token Success',
//   props<{ accessToken: string; refreshToken: string }>()
// );

// export const refreshTokenFailure = createAction(
//   '[user] Refresh Token Failure',
//   props<{ error: string }>()
// );

export const logout = createAction('[user] Logout');
export const logoutComplete = createAction(
  '[user] Logout success',
  props<{ user: User }>()
);
