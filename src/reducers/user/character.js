/* eslint-disable eqeqeq */
import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.fetch("user_character"):
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case types.create("user_character"):
      if (action.payload.result == "created") {
        return {
          ...state,
          [action.payload.object.character]: action.payload.object
        };
      } else {
        return state;
      }
    case types.edit("user_character"):
      return {
        ...state,
        [action.payload.object.character]: action.payload.object
      };
    case types.destroy("user_character"):
      return _.omit(state, action.payload.deleted.character);
    case types.fetchSome("user_characters"):
      return {
        ...state,
        ..._.mapKeys(action.payload, "character")
      };
    case types.SIGN_OUT:
      return {};
    default:
      return state;
  }
};
