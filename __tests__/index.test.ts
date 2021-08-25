import {foo} from "../src/index"

test("basic", () => {
    expect(foo()).toBe(42);
});
