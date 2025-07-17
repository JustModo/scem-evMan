import { Test } from "./test.types";

type CreateFrom<T extends Test> = Omit<T, "id">;
type UpdateFrom<T extends Test> = Partial<Omit<T, "id">>;

export type TestCreate = CreateFrom<Test>;
export type TestUpdate = UpdateFrom<Test>;
