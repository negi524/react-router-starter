import { expect, test } from "vitest";
import { sum } from "~/services/calcService";

test("adds 1 + 2 equals 3", () => {
  expect(sum(1, 2)).toBe(3);
});
