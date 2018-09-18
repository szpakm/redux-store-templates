import {
  applyAddIds,
  applyUpdateById,
  createAddById,
  createRemoveById,
  createAddIds,
  applyRemoveIds
} from "../../src/.internals/mutations";

describe(".internals/mutations/applyAddIds", () => {
  it("adds items to set", () => {
    const source = ["1", "2"];
    const add = ["a", "b", "1"];

    expect(applyAddIds(source, add)).toEqual(["2", "a", "b", "1"]);
  });

  it("adds single item to set", () => {
    const source = ["1", "2"];
    const add = "a";

    expect(applyAddIds(source, add)).toEqual(["1", "2", "a"]);
  });

  it("add ids to empty set", () => {
    const source = [];
    const add = ["a", "b", "1"];

    expect(applyAddIds(source, add)).toEqual(["a", "b", "1"]);
  });
});

describe(".internals/mutations/applyUpdateById", () => {
  it("update item", () => {
    const source = { x: { id: "x", val: "X" } };
    const update = { val2: "Y" };

    expect(applyUpdateById(source, "x", update)).toEqual({
      x: { id: "x", val: "X", val2: "Y" }
    });
  });

  it("returns unchanged when id is not found", () => {
    const source = { x: { id: "x", val: "X" } };
    const update = { val2: "Y" };

    expect(applyUpdateById(source, "z", update)).toEqual(source);
  });
});

describe(".internals/mutations/applyRemoveIds", () => {
  it("remove items from set", () => {
    const source = ["1", "2"];
    const remove = ["a", "b", "1"];

    expect(applyRemoveIds(source, remove)).toEqual(["2"]);
  });

  it("remove single single item from set", () => {
    const source = ["1", "2"];
    const remove = "1";

    expect(applyRemoveIds(source, remove)).toEqual(["2"]);
  });
});

describe(".internals/mutations/createAddById", () => {
  it("create funct that add BYID item", () => {
    const source = { x: { uuid: "x" } };
    const update = { uuid: "y" };

    const addById = createAddById("uuid");

    expect(addById(source, update)).toEqual({
      x: { uuid: "x" },
      y: { uuid: "y" }
    });
  });
});

describe(".internals/mutations/createRemoveById", () => {
  it("create funct that add BYID item", () => {
    const source = {
      x: { uuid: "x" },
      y: { uuid: "y" }
    };
    const removeById = createRemoveById("uuid");

    expect(removeById(source, ["x"])).toEqual({
      y: { uuid: "y" }
    });
  });
});

describe(".internals/mutations/createAddIds", () => {
  it("create funct that add BYID item", () => {
    const source = ["x", "a", "b"];
    const add = [{ uuid: "x" }, { uuid: "y" }];
    const addIds = createAddIds("uuid");

    expect(addIds(source, add)).toEqual(["a", "b", "x", "y"]);
  });
});
