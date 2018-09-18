import {
  makeActionCreator,
  createPathReader,
  pick
} from "../../src/.internals/helpers";


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
