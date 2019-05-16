import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authCodeReducer from "./auth/authCode";
import accessTokenReducer from "./auth/accessToken";
import discordProfileReducer from "./auth/discordProfile";
import authUserReducer from "./auth/user";
import userReducer from "./user/reducer";
import characterReducer from "./character/reducer";
import characterDataReducer from "./character/data";
import characterNameReducer from "./character/name";
import userCharacterReducer from "./user/character";
import guildReducer from "./guild/reducer";
import guildDataReducer from "./guild/data";
import eventReducer from "./event/reducer";
import heartbeat from "./heartbeat/reducer";
import alert from "./alert/reducer";

export default combineReducers({
  tokenResponse: authCodeReducer,
  discordProfile: accessTokenReducer,
  discordUserMatch: discordProfileReducer,
  currentUser: authUserReducer,
  users: userReducer,
  characters: characterReducer,
  characterData: characterDataReducer,
  characterNames: characterNameReducer,
  userCharacters: userCharacterReducer,
  guilds: guildReducer,
  guildData: guildDataReducer,
  events: eventReducer,
  form: formReducer,
  heartbeat: heartbeat,
  alerts: alert
});
