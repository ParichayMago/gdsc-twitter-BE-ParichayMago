export type withAuth<T> = {
  [K in keyof T]: T[K];
} & { loggedInUserId: string };