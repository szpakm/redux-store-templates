/* object/array - immutable modifications helpers */

import { readAsArray } from "./utils";

export const applyAddIds = (ids = [], addIds = []) => {
  const idsToAdd = readAsArray(addIds);

  return [...ids.filter(id => !idsToAdd.includes(id)), ...idsToAdd];
};

export const createUpdateById = idName => (byId = {}, updates = []) => {
  const itemsUpdates = readAsArray(updates);

  // return byId with updated items
  return itemsUpdates.reduce((acc, curr) => {
    const idOfItemToBeUpdated = curr[idName];
    const itemToBeUpdated = byId[idOfItemToBeUpdated];

    if (!idOfItemToBeUpdated || !itemToBeUpdated) {
      // don't do anything if update has no corresponding existing item
      return acc;
    }

    return {
      ...acc,
      [idOfItemToBeUpdated]: { ...itemToBeUpdated, ...curr }
    }
  }, byId);
}


export const applyRemoveIds = (ids = [], removeIds = []) => {
  const idsToRemove = readAsArray(removeIds);

  return ids.filter(id => !idsToRemove.includes(id));
};

export const createAddById = keyName => (byId = {}, items = []) => {
  const itemsToAdd = readAsArray(items);

  const add = itemsToAdd.reduce(
    (acc, curr) => ({
      ...acc,
      [curr[keyName]]: curr
    }),
    {}
  );

  return {
    ...byId,
    ...add
  };
};

export const createRemoveById = keyName => (byId = {}, removeIds = []) => {
  const idsToRemove = readAsArray(removeIds);

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
  const itemsToAdd = readAsArray(items);
  const addIds = itemsToAdd.map(item => item[keyName]);

  return applyAddIds(ids, addIds);
};
