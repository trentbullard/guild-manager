import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.HANDLE_DISCORD_DATA:
      if (action.payload[0]) {
        return action.payload[0]._source;
      } else {
        return {};
      }
    case types.SIGN_OUT:
      return null;
    default:
      return state;
  }
};
