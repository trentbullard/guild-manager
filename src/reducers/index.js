import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";
import guildReducer from "./guildReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  auth: authReducer,
  users: userReducer,
  form: formReducer,
  characters: characterReducer,
  guilds: guildReducer,
  events: eventReducer
});
