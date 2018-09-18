import { readAsArray, warn } from "../../src/.internals/utils";

describe(".internals/utils/readAsArray", () => {
  it("reads string as array with string", () => {
    expect(readAsArray("VALUE")).toEqual(["VALUE"]);
  });

  it("reads array without changes", () => {
    expect(readAsArray(["VALUE"])).toEqual(["VALUE"]);
  });
});

describe(".internals/utils/warn", () => {
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
