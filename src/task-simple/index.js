import { pick, warn, createPathReader, readAsArray } from "../.internals";

export const createReducer = ({ startOn, successOn, errorOn }) => {
  const defaultState = {
    isPending: false,
    error: ""
  };
  const handleAction = Object.create(null);

  if (startOn) {
    readAsArray(startOn).forEach(opt => {
      handleAction[opt.type] = state => {
        return {
          ...state,
          isPending: true,
          error: defaultState.error
        };
      };
    });
  }
  if (successOn) {
    readAsArray(successOn).forEach(opt => {
      handleAction[opt.type] = state => {
        return {
          ...state,
          isPending: false,
          error: defaultState.error
        };
      };
    });
  }
  if (errorOn) {
    readAsArray(errorOn).forEach(opt => {
      const readActionPayload = createPathReader(opt.payloadPath);
      handleAction[opt.type] = (state, action) => {
        const error = readActionPayload(action);
        if (!error) {
          warn(
            `task-simple: errorOn: action ${opt.type} should have ${
              opt.payloadPath
            }:string property`
          );
        }

        return {
          ...state,
          isPending: false,
          error
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

export const createSelector = ({ selector, fields = [], uuid = "" }) => {
  // TODO - performance
  return state => {
    const selectedTask = selector(state);
    if (!selectedTask) {
      throw new Error(
        `Could not find state for TaskSimple.selector with uuid: ${uuid}`
      );
    }

    return pick(selectedTask, fields);
  };
};
