import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '../app.state';

export const initialState: UserState = {
  user: null,
  carts: [],
  saves: [],
  likes: [],
  follows: [],
  actionState: {
    error: null,
    loading: false,
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => {
    return {
      ...state,
      actionState: {
        loading: true,
        error: null,
      },
    };
  }),
  on(UserActions.checkToken, (state) => {
    return {
      ...state,
      actionState: {
        loading: true,
        error: null,
      },
    };
  }),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    actionState: {
      loading: false,
      error: null,
    },
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    actionState: {
      error,
      loading: false,
    },
  })),

  on(UserActions.userActionsFailure, (state, props) => ({
    ...state,
    carts: [],
    likes: [],
    saves: [],
    follows: [],
    actionState: {
      error: props.error,
      loading: false,
    },
  })),
  on(UserActions.userActionsSuccess, (state, props) => ({
    ...state,
    carts: props.cart,
    likes: props.likes,
    saves: props.saves,
    follows: props.follows,
    actionState: {
      error: null,
      loading: false,
    },
  })),
  on(UserActions.setUser, (state, props) => ({
    ...state,
    user: props,
  })),
  // on(
  //   UserActions.refreshTokenSuccess,
  //   (state, { accessToken, refreshToken }) => ({
  //     ...state,
  //     accessToken,
  //     refreshToken,
  //     error: null,
  //   })
  // ),
  // on(UserActions.refreshTokenFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  // })),
  on(UserActions.logoutComplete, (state, props) => {
    return { ...initialState, user: props.user };
  }),
  on(UserActions.logout, (state) => {
    return { ...state };
  })
);
