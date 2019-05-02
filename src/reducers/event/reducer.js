import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("event"):
    case types.fetch("event"):
    case types.edit("event"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("event"):
      return _.omit(state, action.payload);
    case types.fetch("events"):
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
