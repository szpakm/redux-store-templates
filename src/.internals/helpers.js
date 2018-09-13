export const pick = (source = {}, what = []) => {
  if (Array.isArray(what)) {
    return what.reduce((acc, curr) => {
      acc[curr] = source[curr];

      return acc;
    }, {});
  }
  // else what is string
  return source[what];
};

export const makeActionCreator = (action = {}, options = {}) => {
  const actionObject = typeof action === "string" ? { type: action } : action;
  const payloadName = options.payloadName || "payload";

  if (!actionObject["type"]) {
    throw new Error(
      "makeActionCreator requires param which is string or extends { type: string }"
    );
  }

  return payload => ({
    [payloadName]: payload,
    ...actionObject
  });
};

export const warn = message =>
  console.warn("redux-store-templates: " + message);

const _cache = Object.create(null);
export const createPathReader = (path = "payload") => {
  if (path === undefined) {
    throw new Error("redux-store-templates: path cannot be empty");
  }
  const uuid = String(path);

  if (_cache[uuid]) {
    return _cache[uuid];
  }

  const parts = Array.isArray(path) ? path : path.split(".");
  if (!parts.length || parts.length > 3) {
    throw new Error(
      "redux-store-templates: path length must be 1-3 levels deep"
    );
  }

  /*
    Due to performance didn't use lodash or more sophisticated way.
    Performance of this should be improved anyway
  */
  if (parts.length === 1) {
    _cache[uuid] = data => (data || {})[parts[0]];
  } else if (parts.length === 2) {
    _cache[uuid] = data => ((data || {})[parts[0]] || {})[parts[1]];
  } else if (parts.length === 3) {
    _cache[uuid] = data =>
      (((data || {})[parts[0]] || {})[parts[1]] || {})[parts[2]];
  }

  return _cache[uuid];
};

export const readAsArray = (data) => {
  return Array.isArray(data) ? data : [data];
}
