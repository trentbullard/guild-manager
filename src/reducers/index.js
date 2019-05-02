import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authCodeReducer from "./auth/authCode";
import accessTokenReducer from "./auth/accessToken";
import discordProfileReducer from "./auth/discordProfile";
import authUserReducer from "./auth/user";
import userReducer from "./user/reducer";
import characterReducer from "./character/reducer";
import characterDataReducer from "./character/data";
import userCharacterReducer from "./user/character";
import guildReducer from "./guild/reducer";
import guildDataReducer from "./guild/data";
import eventReducer from "./event/reducer";
import userGuildReducer from "./userGuildReducer";

export default combineReducers({
  tokenResponse: authCodeReducer,
  discordProfile: accessTokenReducer,
  discordUserMatch: discordProfileReducer,
  currentUser: authUserReducer,
  users: userReducer,
  characters: characterReducer,
  characterData: characterDataReducer,
  userCharacters: userCharacterReducer,
  guilds: guildReducer,
  guildData: guildDataReducer,
  userGuilds: userGuildReducer,
  events: eventReducer,
  form: formReducer
});
