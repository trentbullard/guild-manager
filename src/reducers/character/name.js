import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.FETCH_CHARACTER_NAMES:
      return action.payload;
    default:
      return state;
  }
};
