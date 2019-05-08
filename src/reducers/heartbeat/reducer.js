import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.HEARTBEAT:
      return new Date().toISOString();
    default:
      return state;
  }
};
