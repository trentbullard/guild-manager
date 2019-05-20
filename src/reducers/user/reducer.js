/* eslint-disable eqeqeq */
import _ from "lodash";
import * as types from "../../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.fetch("user"):
      const first = action.payload[0];
      if (first) {
        return {
          ...state,
          ..._.mapKeys(first._source, "id")
        };
      } else {
        return state;
      }
    case types.create("user"):
      if (action.payload.result == "created") {
        return {
          ...state,
          [action.payload.object.id]: action.payload.object
        };
      } else {
        return state;
      }
    case types.edit("user"):
      return {
        ...state,
        [action.payload.object.id]: action.payload.object
      };
    case types.destroy("user"):
      return _.omit(state, action.payload);
    case types.fetch("users"):
      return {
        ...state,
        ..._.mapKeys(action.payload, "id")
      };
    case types.SIGN_OUT:
      return null;
    default:
      return state;
  }
};
