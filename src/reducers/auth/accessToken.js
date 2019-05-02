import _ from "lodash";
import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.HANDLE_ACCESS_TOKEN:
      return { ...state, ...action.payload };
    case types.SIGN_OUT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
