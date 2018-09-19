import { createReducer } from "../src/task-simple";

const defaultState = {
  isPending: false,
  error: ""
};

describe("task-simple", () => {
  it("returns state when empty action is provided", () => {
    const reducer = createReducer();

    expect(reducer(defaultState, {})).toEqual(defaultState);
  });

  it("returns initial state when empty action is provided", () => {
    const reducer = createReducer({
      initial: true
    });

    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it("starts on action", () => {
    const reducer = createReducer({
      startOn: { type: "start" }
    });

    expect(reducer(defaultState, { type: "start" })).toEqual({
      isPending: true,
      error: ""
    });
  });

  it("success on action", () => {
    const reducer = createReducer({
      successOn: { type: "success" }
    });

    expect(reducer(defaultState, { type: "success" })).toEqual({
      isPending: false,
      error: ""
    });
  });

  it("saves error on action", () => {
    const reducer = createReducer({
      errorOn: { type: "error", payloadPath: "errorMsg" }
    });

    expect(reducer(defaultState, { type: "error", errorMsg: "uuups" })).toEqual(
      {
        isPending: false,
        error: "uuups"
      }
    );
  });
});
