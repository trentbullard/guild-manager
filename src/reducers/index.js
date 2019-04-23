import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";
import userCharacterReducer from "./userCharacterReducer";
import guildReducer from "./guildReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  auth: authReducer,
  users: userReducer,
  characters: characterReducer,
  userCharacters: userCharacterReducer,
  form: formReducer,
  guilds: guildReducer,
  events: eventReducer
});
