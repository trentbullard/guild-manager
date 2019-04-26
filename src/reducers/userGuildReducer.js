import _ from "lodash";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("user_guild"):
    case types.fetch("user_guild"):
    case types.edit("user_guild"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("user_guild"):
      return _.omit(state, action.payload);
    case types.fetchSome("user_guilds"):
    case types.fetch("user_guilds"):
      return { ...state, ..._.mapKeys(action.payload, "guild_id") };
    default:
      return state;
  }
};
