import _ from "lodash";
import * as types from "../actions/types";

const INITIAL_STATE = {
  items: {},
  guildData: null,
  searched: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.create("guild"):
    case types.fetch("guild"):
    case types.edit("guild"):
      return {
        ...state,
        items: { [action.payload.id]: action.payload },
        searched: true
      };
    case types.destroy("guild"):
      return _.omit(state, action.payload);
    case types.fetchSome("guilds"):
    case types.fetch("guilds"):
      return {
        ...state,
        items: { ..._.mapKeys(action.payload, "name") },
        searched: true
      };
    case types.FETCH_EQ2_GUILD_DATA:
      return { ...state, guildData: action.payload.guild_list[0] };
    default:
      return state;
  }
};
