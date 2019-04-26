import _ from "lodash";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.create("character"):
    case types.fetch("character"):
    case types.edit("character"):
      return { ...state, [action.payload.id]: action.payload };
    case types.destroy("character"):
      return _.omit(state, action.payload);
    case types.fetchSome("characters"):
    case types.fetch("characters"):
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case types.FETCH_EQ2_CHARACTER_DATA:
      return { ...state, characterData: action.payload.character_list };
    default:
      return state;
  }
};
