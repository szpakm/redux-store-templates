import {
  createPathReader,
  createAddById,
  createAddIds,
  createRemoveById,
  applyRemoveIds,
  warn,
  applyUpdateById,
  readAsArray
} from "../.internals";

export const createReducer = ({
  idName = "uuid",
  initial = [],
  setOn,
  addOn,
  updateOn,
  removeOn,
  emptyOn
} = {}) => {
  const addToById = createAddById(idName);
  const addToIds = createAddIds(idName);
  const defaultState = {
    byId: addToById({}, initial),
    ids: addToIds([], initial)
  };
  const emptyState = {
    byId: {},
    ids: []
  };
  const handleAction = Object.create(null);

  if (setOn) {
    readAsArray(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const items = readActionPayload(action);

        return {
          ...state,
          selectedIds: emptyState.selectedIds,
          byId: addToById({}, items),
          ids: addToIds([], items)
        };
      };
    });
  }
  if (addOn) {
    readAsArray(addOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const items = readActionPayload(action);

        return {
          ...state,
          byId: addToById(state.byId, items),
          ids: addToIds(state.ids, items)
        };
      };
    });
  }
  if (updateOn) {
    readAsArray(updateOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const updates = readActionPayload(action);
        const itemId = updates[idName];
        if (!itemId) {
          warn(
            `list-advanced: updateOn: action "${
              opt.type
            }" has no idName param. Missing param ${opt.payloadPath}.${idName}`
          );
          return state;
        }

        return {
          ...state,
          byId: applyUpdateById(state.byId, itemId, updates)
        };
      };
    });
  }
  if (removeOn) {
    const removeFromById = createRemoveById(idName);

    readAsArray(removeOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const ids = readActionPayload(action);

        return {
          ...state,
          byId: removeFromById(state.byId, ids),
          ids: applyRemoveIds(state.ids, ids),
          selectedIds: applyRemoveIds(state.selectedIds, ids)
        };
      };
    });
  }
  if (emptyOn) {
    readAsArray(emptyOn).forEach(opt => {
      handleAction[opt.type] = state => {
        return {
          ...state,
          byId: emptyState.byId,
          ids: emptyState.ids,
          selectedIds: emptyState.selectedIds
        };
      };
    });
  }

  return (state = defaultState, action) => {
    return handleAction[action.type]
      ? handleAction[action.type](state, action)
      : state;
  };
};

/* selectors */

export const createSelectorAll = ({ selector }) => state => {
  const list = selector(state);

  return list.ids.map(id => list.byId[id]);
};

export const createSelectorById = ({ selector }) => {
  return (state, id) => selector(state).byId[id];
};
