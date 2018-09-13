import { createPathReader, readAsArray } from "../.internals";

export const createReducer = ({
  initial = "",
  setOn,
  resetOn
}) => {
  const resetState = initial;
  const handleAction = Object.create(null);

  if (setOn) {
    readAsArray(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => readActionPayload(action);
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
