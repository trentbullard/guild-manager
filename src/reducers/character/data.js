import _ from "lodash";
import * as types from "../../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_EQ2_CHARACTER_DATA:
      return {
        ...state,
        ..._.mapKeys(action.payload.character_list, "name.first_lower")
      };
    default:
      return state;
  }
};
