/* object/array - immutable modifications helpers */


export const applyAddIds = (ids = [], addIds = []) => {
  const idsToAdd = Array.isArray(addIds) ? addIds : [addIds];

  return [...ids.filter(id => !idsToAdd.includes(id)), ...idsToAdd];
};

export const applyUpdateById = (byId = {}, id, updates = {}) => {
  if (byId[id] === undefined) {
    return byId;
  }

  return {
    ...byId,
    [id]: { ...byId[id], ...updates}
  };
}

export const createAddById = keyName => (list = [], items = []) => {
  const itemsToAdd = Array.isArray(items) ? items : [items];

  // exract it to separate func
  const add = itemsToAdd.reduce(
    (acc, curr) => ({
      ...acc,
      [curr[keyName]]: curr
    }),
    {}
  );

  return {
    ...list,
    ...add
  };
};

export const createRemoveById = keyName => (byId = {}, removeIds = []) => {
  const idsToRemove = Array.isArray(removeIds) ? removeIds : [removeIds];

  return Object.keys(byId)
    .filter(key => !idsToRemove.includes(key))
    .map(key => byId[key])
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr[keyName]]: curr
      }),
      {}
    );
};

export const createAddIds = keyName => (ids = [], items = []) => {
  const itemsToAdd = Array.isArray(items) ? items : [items];
  const addIds = itemsToAdd.map(item => item[keyName]);

  return applyAddIds(ids, addIds);
};

export const applyRemoveIds = (ids = [], removeIds = []) => {
  const idsToRemove = Array.isArray(removeIds) ? removeIds : [removeIds];

  return ids.filter(id => !idsToRemove.includes(id));
};
