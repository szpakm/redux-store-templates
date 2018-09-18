import { createPathReader, warn, readAsArray } from "../.internals";

const add = (state, delta) => {
  return typeof delta === "number" ? state + delta : state;
};

export const createReducer = ({
  initial = 0,
  incrementOn,
  decrementOn,
  incrementByOn,
  decrementByOn,
  setOn,
  resetOn
} = {}) => {
  const resetState = 0;
  const handleAction = Object.create(null);

  if (incrementOn) {
    readAsArray(incrementOn).forEach(opt => {
      handleAction[opt.type] = state => add(state, 1);
    });
  }
  if (decrementOn) {
    readAsArray(decrementOn).forEach(opt => {
      handleAction[opt.type] = state => add(state, -1);
    });
  }
  if (incrementByOn) {
    readAsArray(incrementByOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        return add(state, readActionPayload(action));
      };
    });
  }
  if (decrementByOn) {
    readAsArray(decrementByOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        return add(state, -readActionPayload(action));
      };
    });
  }
  if (setOn) {
    readAsArray(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const val = readActionPayload(action);
        return val;
      };
    });
  }
  if (resetOn) {
    readAsArray(resetOn).forEach(opt => {
      handleAction[opt.type] = () => resetState;
    });
  }

  return (state = initial, action) => {
    return handleAction[action.type]
      ? handleAction[action.type](state, action)
      : state;
  };
};

export const createSelector = ({ selector }) => {
  return state => selector(state);
};
