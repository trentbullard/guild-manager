import _ from "lodash";
import * as types from "../../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.FLASHMESSAGE:
      return _.compact([action.payload].flat());
    default:
      return state;
  }
};
