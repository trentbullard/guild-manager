import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.fetch("guild"):
      return {
        ...state,
        [action.payload.guildid]: action.payload
      };
    case types.create("guild"):
      if (action.payload.result == "created") {
        return {
          ...state,
          [action.payload.object.guildid]: action.payload.object
        };
      } else {
        return state;
      }
    case types.edit("guild"):
      return {
        ...state,
        [action.payload.guildid]: action.payload
      };
    case types.destroy("guild"):
      return _.omit(state, action.payload);
    case types.destroy("user_character"):
      return {};
    case types.fetchSome("guilds"):
    case types.fetch("guilds"):
      return {
        ...state,
        ..._.mapKeys(action.payload, "guildid")
      };
    case types.SIGN_OUT:
      return {};
    default:
      return state;
  }
};
