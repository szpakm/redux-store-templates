import { warn, createPathReader, readAsArray } from "../.internals";

export const createReducer = ({
  initial = false,
  toggleOn,
  makeTrueOn,
  makeFalseOn,
  setOn,
  resetOn
} = {}) => {
  const resetState = initial;
  const handleAction = Object.create(null);

  if (toggleOn) {
    readAsArray(toggleOn).forEach(opt => {
      handleAction[opt.type] = state => !state;
    });
  }
  if (makeTrueOn) {
    readAsArray(makeTrueOn).forEach(opt => {
      handleAction[opt.type] = () => true;
    });
  }
  if (makeFalseOn) {
    readAsArray(makeFalseOn).forEach(opt => {
      handleAction[opt.type] = () => false;
    });
  }
  if (setOn) {
    readAsArray(setOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const value = readActionPayload(action);

        if (typeof value != 'boolean') {
          warn(`toggle: setOn: action "${opt.type}" should have property ${opt.payloadPath}`);
        }
        return !!value;
      }
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
