import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.HANDLE_AUTH_CODE:
      return action.payload;
    case types.SIGN_OUT:
      return null;
    default:
      return state;
  }
};
