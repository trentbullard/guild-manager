import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("user"):
    case types.fetch("user"):
    case types.edit("user"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("user"):
      return _.omit(state, action.payload);
    case types.fetch("users"):
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
