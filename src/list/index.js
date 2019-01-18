import {
  createPathReader,
  createAddById,
  createAddIds,
  createUpdateById,
  createRemoveById,
  applyRemoveIds,
  warn,  
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
  const updateById = createUpdateById(idName);
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

        return {
          ...state,
          byId: updateById(state.byId, updates)
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
          ids: applyRemoveIds(state.ids, ids)
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
          ids: emptyState.ids
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
  return (state, id) => {
    const byId = selector(state).byId;
    if (Array.isArray(id)) {
      return id.map(itemId => byId[itemId]);
    }
    // else id: string
    return byId[id];
  };
};
