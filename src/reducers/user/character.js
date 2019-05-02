import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("user_character"):
    case types.fetch("user_character"):
    case types.edit("user_character"):
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case types.destroy("user_character"):
      return _.omit(state, action.payload);
    case types.fetchSome("user_characters"):
    case types.fetch("user_characters"):
      return {
        ...state,
        ..._.mapKeys(action.payload, "character_id")
      };
    default:
      return state;
  }
};
