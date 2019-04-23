import _ from "lodash";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("guild"):
    case types.fetch("guild"):
    case types.edit("guild"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("guild"):
      return _.omit(state, action.payload);
    case types.fetch("guilds"):
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
