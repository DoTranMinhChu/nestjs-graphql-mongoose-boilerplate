declare global {
  type FindAllResponse<T> = { count: number; items: T[] };
}

export {};
