import data from "../apis/data";
import history from "../history";
import discordAuth from "../apis/discord";
import * as types from "./types";

export const fetchOne = (oType, id) => async dispatch => {
  const response = await data.get(`/${oType}s/${id}`);
  dispatch({ type: types.fetch(oType), payload: response.data });
};

export const fetchAll = oType => async dispatch => {
  const response = await data.get(`/${oType}s`);
  dispatch({ type: types.fetch(`${oType}s`), payload: response.data });
};

export const create = (oType, formValues) => async dispatch => {
  const response = await data.post(`/${oType}s`, formValues);
  dispatch({ type: types.create(oType), payload: response.data });
  history.push("/");
};

export const edit = (oType, id, formValues) => async dispatch => {
  const response = await data.patch(`/${oType}s/${id}`, formValues);
  dispatch({ type: types.edit(oType), payload: response.data });
  history.push("/");
};

export const destroy = (oType, id) => async dispatch => {
  const response = await data.delete(`/${oType}s/${id}`);
  dispatch({ type: types.destroy(oType), payload: response.data });
  history.push("/");
};

export const handleDiscordData = discordId => async dispatch => {
  const response = await data.get(`/users?discord_id=${discordId}`);
  dispatch({ type: types.HANDLE_DISCORD_DATA, payload: response.data });
};

export const handleAccessToken = token => async dispatch => {
  const response = await discordAuth.get(`/users/@me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  dispatch({ type: types.HANDLE_ACCESS_TOKEN, payload: response.data });
};

export const handleAuthCode = code => async dispatch => {
  const params = new URLSearchParams();
  params.append("client_id", process.env.REACT_APP_DISCORD_OAUTH_CLIENT_ID);
  params.append("client_secret", process.env.REACT_APP_DISCORD_OAUTH_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append(
    "redirect_uri",
    `${process.env.REACT_APP_ROOT_URI}/oauth/token`
  );
  params.append("scope", "identify email");

  try {
    const response = await discordAuth.post("/oauth2/token", params);
    dispatch({
      type: types.HANDLE_AUTH_CODE,
      payload: response.data
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: types.HANDLE_AUTH_CODE,
      payload: e.response.data
    });
  }
};

export const signIn = userId => {
  return {
    type: types.SIGN_IN,
    payload: userId
  };
};

export const fetchAuthUser = userId => async dispatch => {
  const response = await data.get(`/users/${userId}`);
  dispatch({ type: types.FETCH_AUTH_USER, payload: response.data });
};

export const signOut = userId => {
  return {
    type: types.SIGN_OUT
  };
};
