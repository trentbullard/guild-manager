import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_EQ2_GUILD_DATA:
      return {
        ...state,
        ..._.mapKeys(action.payload.guild_list, "guildid")
      };
    default:
      return state;
  }
};
