import { UserState } from '../app.state';

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectActionState = (state: { user: UserState }) => state.user.actionState;
export const selectUserActions = (state: { user: UserState }) => ({
  carts: state.user.carts,
  likes: state.user.likes,
  saves: state.user.saves,
});
