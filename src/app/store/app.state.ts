import { User } from '../../types';

export interface UserState {
  user: User | null;
  carts: { product: string; quantity: number }[];
  saves: string[];
  likes: string[];
  follows: string[];

  actionState: {
    error: string | null;
    loading: boolean;
  };
}
