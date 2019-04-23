import * as types from "../actions/types";

const INITIAL_STATE = {
  currentUser: {},
  tokenResponse: null,
  discordProfileData: null,
  discordUserMatch: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.HANDLE_AUTH_CODE:
      return { ...state, tokenResponse: action.payload };
    case types.HANDLE_ACCESS_TOKEN:
      return { ...state, discordProfileData: action.payload };
    case types.HANDLE_DISCORD_DATA:
      return { ...state, discordUserMatch: action.payload[0] };
    case types.FETCH_AUTH_USER:
      return { ...state, currentUser: action.payload };
    case types.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        tokenResponse: null,
        discordProfileData: null,
        discordUserMatch: null
      };
    default:
      return state;
  }
};
