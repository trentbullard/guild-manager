import _ from "lodash";
import * as types from "../../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.FLASHMESSAGE:
      console.log("action.payload: ", action.payload);
      return _.compact([action.payload].flat());
    case types.SIGN_OUT:
      return [];
    default:
      return state;
  }
};
