import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.FETCH_AUTH_USER:
      if (action.payload[0]) {
        return action.payload[0]._source;
      } else {
        return state;
      }
    case types.SIGN_OUT:
      return null;
    default:
      return state;
  }
};
