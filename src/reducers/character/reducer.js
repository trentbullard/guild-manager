import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.fetch("character"):
      return {
        ...state,
        [action.payload.name.first_lower]: action.payload
      };
    case types.create("character"):
      if (action.payload.result == "created") {
        return {
          ...state,
          [action.payload.object.name.first_lower]: action.payload.object
        };
      } else {
        return state;
      }
    case types.edit("character"):
      return {
        ...state,
        [action.payload.name.first_lower]: action.payload
      };
    case types.destroy("character"):
      return _.omit(state, action.payload);
    case types.destroy("user_character"):
      return _.omit(state, action.payload.deleted.character);
    case types.fetchSome("characters"):
    case types.fetch("characters"):
      return {
        ...state,
        ..._.mapKeys(action.payload, "name.first_lower")
      };
    case types.SIGN_OUT:
      return {};
    default:
      return state;
  }
};
