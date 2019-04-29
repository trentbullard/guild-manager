import _ from "lodash";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("guild_character"):
    case types.fetch("guild_character"):
    case types.edit("guild_character"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("guild_character"):
      return _.omit(state, action.payload);
    case types.fetchSome("guild_characters"):
    case types.fetch("guild_characters"):
      return { ...state, ..._.mapKeys(action.payload, "character_id") };
    default:
      return state;
  }
};
