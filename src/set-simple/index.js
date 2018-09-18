import {
  applyAddIds,
  applyRemoveIds,
  readAsArray,
  createPathReader
} from "../.internals";

export const createReducer = ({
  initial = [],
  setOn,
  addOn,
  removeOn,
  emptyOn
} = {}) => {
  const defaultState = initial;
  const emptyState = [];
  const handleAction = Object.create(null);

  if (setOn) {
    readAsArray(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        return applyAddIds([], readActionPayload(action));
      };
    });
  }
  if (addOn) {
    readAsArray(addOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        return applyAddIds(state, readActionPayload(action));
      };
    });
  }
  if (removeOn) {
    readAsArray(removeOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        return applyRemoveIds(state, readActionPayload(action));
      };
    });
  }
  if (emptyOn) {
    readAsArray(emptyOn).forEach(opt => {
      handleAction[opt.type] = () => emptyState;
    });
  }

  return (state = defaultState, action) => {
    return handleAction[action.type]
      ? handleAction[action.type](state, action)
      : state;
  };
};
