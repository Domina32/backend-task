import { suma } from "sumFunc";
import { test, expect } from "@jest/globals";

test("adds 1 + 2 to equal 3", () => {
    expect(suma(1, 2)).toBe(3);
});
