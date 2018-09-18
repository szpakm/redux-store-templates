import {
  makeActionCreator,
  createPathReader,
  readAsArray,
  pick,
  warn
} from "../../src/.internals/helpers";

describe(".internals/helpers/readAsArray", () => {
  it("reads string as array with string", () => {
    expect(readAsArray("VALUE")).toEqual(["VALUE"]);
  });

  it("reads array without changes", () => {
    expect(readAsArray(["VALUE"])).toEqual(["VALUE"]);
  });
});

describe(".internals/helpers/pick", () => {
  it("returns direct field value if string parameter", () => {
    expect(pick({ x: "X", y: "Y" }, "x")).toEqual("X");
  });

  it("returns object with field value if array parameter", () => {
    expect(pick({ x: "X", y: "Y", z: "Z" }, ["x", "y"])).toEqual({
      x: "X",
      y: "Y"
    });
  });

  it("returns whole object if no parameter", () => {
    expect(pick({ x: "X", y: "Y" })).toEqual({ x: "X", y: "Y" });
  });
});

describe(".internals/helpers/makeActionCrator", () => {
  it("creates action from string parameter", () => {
    const expectedAction = {
      type: "TYPE_TEST",
      payload: "VALUE"
    };
    const simpleActionCreator = makeActionCreator("TYPE_TEST");

    expect(simpleActionCreator("VALUE")).toEqual(expectedAction);
  });

  it("creates action from object { type: string } parameter", () => {
    const expectedAction = {
      type: "TYPE_TEST",
      payload: "VALUE"
    };
    const simpleActionCreator = makeActionCreator({ type: "TYPE_TEST" });

    expect(simpleActionCreator("VALUE")).toEqual(expectedAction);
  });
});

describe(".internals/helpers/createPathReader", () => {
  it("reads from 3 levels deep path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.y.z");

    expect(read(data)).toEqual("goal!");
  });

  it("returns undefined for non existing field in the middle of path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.p.z");

    expect(read(data)).toBeUndefined();
  });

  it("returns undefined for non existing field at the beginning of path", () => {
    const data = {};
    const read = createPathReader("x.y.z");
    expect(read(data)).toBeUndefined();
  });

  it("returns undefined for non existing field at the end of path", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader("x.y.p");

    expect(read(data)).toBeUndefined();
  });

  it('returns "payload" for no path provided', () => {
    const data = { payload: "goal!" };
    const read = createPathReader();

    expect(read(data)).toEqual("goal!");
  });

  it("works if path is an Array", () => {
    const data = { x: { y: { z: "goal!" } } };
    const read = createPathReader(["x", "y", "z"]);

    expect(read(data)).toEqual("goal!");
  });
});

describe(".internals/helpers/warn", () => {
  it("calls console.warn with prefix when available", () => {
    const preSpy = console.warn;
    const spy = jest.fn();

    console.warn = spy;
    try {
      warn("Test");
      expect(spy.mock.calls[0][0]).toBe("redux-store-templates: Test");
    } finally {
      spy.mockClear();
      console.warn = preSpy;
    }
  });

  it("does not throw when console.warn is not available", () => {
    const realConsole = global.console;
    Object.defineProperty(global, "console", { value: {} });
    try {
      expect(() => warn("Test")).not.toThrow();
    } finally {
      Object.defineProperty(global, "console", { value: realConsole });
    }
  });
});
