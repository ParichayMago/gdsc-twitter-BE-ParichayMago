import { IUser } from "../models/data/User";

export type withAuth<T> = {
  [K in keyof T]: T[K];
} & {userId: string };

export type withUser<T> = {
  [K in keyof T]: T[K];
} & {user: IUser}

