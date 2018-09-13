import { createReducer } from "../src/counter";

describe("counter", () => {
  it("counter - initial parameter", () => {
    const reducer = createReducer({
      initial: 10
    });

    expect(reducer(5)).toEqual(5);
  });

  it("counter - increment", () => {
    const reducer = createReducer({
      incrementOn: { type: "incrementOn" }
    });

    expect(reducer(10, { type: "incrementOn" })).toEqual(11);
  });

  it("counter - decrementOn by multiple actions", () => {
    const reducer = createReducer({
      decrementOn: [{ type: "decrementOnFirst" }, { type: "decrementOnSecond" }]
    });
    const step1 = reducer(10, { type: "decrementOnFirst" });

    expect(reducer(step1, { type: "decrementOnSecond" })).toEqual(8);
  });
});
