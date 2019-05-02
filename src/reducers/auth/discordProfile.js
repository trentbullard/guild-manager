import _ from "lodash";
import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.HANDLE_DISCORD_DATA:
      return {
        ...state,
        ...action.payload[0]
      };
    case types.SIGN_OUT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
