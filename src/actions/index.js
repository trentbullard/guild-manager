import history from "../history";
import discordAuth from "../apis/discord";
import eq2Data from "../apis/eq2";
import es from "../apis/es";
import * as types from "./types";

export const fetchOne = (oType, query) => async dispatch => {
  try {
    const response = await es.get(`/${oType}/_doc/_search?q=${query}`);
    dispatch({
      type: types.fetch(oType),
      payload: response.data.hits.hits
    });
  } catch (err) {
    dispatch({
      type: types.FLASHMESSAGE,
      payload: err.response.status
    });
  }
};

export const fetchSome = (
  oType,
  terms,
  ignoreErrors = false
) => async dispatch => {
  try {
    const response = await es.get(`/${oType}/_doc/_search?q=${terms}`);
    dispatch({
      type: types.fetchSome(`${oType}s`),
      payload: response.data.hits.hits.map(o => {
        return o._source;
      })
    });
  } catch (err) {
    dispatch({
      type: types.FLASHMESSAGE,
      payload: err.response.status
    });
  }
};

export const fetchNames = () => async dispatch => {
  try {
    const response = await es.get(`/character/_search`);
    dispatch({
      type: types.FETCH_CHARACTER_NAMES,
      payload: response.data.hits.hits.map(o => {
        return o._source.name.first_lower;
      })
    });
  } catch (err) {
    dispatch({
      type: types.FLASHMESSAGE,
      payload: err.response.status
    });
  }
};

export const fetchAll = oType => async dispatch => {
  try {
    const response = await es.get(`/${oType}/_doc/_search`);
    dispatch({
      type: types.fetch(`${oType}s`),
      payload: response.data.hits.hits.map(o => {
        return o._source;
      })
    });
  } catch (err) {
    dispatch({
      type: types.FLASHMESSAGE,
      payload: err.response.status
    });
  }
};

export const create = (
  oType,
  id,
  formValues,
  doRedirect = false
) => async dispatch => {
  const response = await es.post(`/${oType}/_doc/${id}`, formValues);
  dispatch({
    type: types.create(oType),
    payload: {
      result: response.data.result,
      object: formValues
    }
  });
  if (doRedirect) {
    history.push("/");
  }
};

export const edit = (
  oType,
  id,
  formValues,
  doRedirect = false
) => async dispatch => {
  await es.put(`/${oType}/_doc/${id}`, formValues);
  dispatch({
    type: types.edit(oType),
    payload: { ...formValues, id: id }
  });
  if (doRedirect) {
    history.push("/");
  }
};

export const destroy = (
  oType,
  id,
  oToDestroy,
  doRedirect = false
) => async dispatch => {
  const response = await es.delete(`/${oType}/_doc/${id}`);
  dispatch({
    type: types.destroy(oType),
    payload: { found: response.data.found, deleted: oToDestroy }
  });
  if (doRedirect) {
    history.push("/");
  }
};

export const heartbeat = (doRedirect = false) => async dispatch => {
  dispatch({ type: types.HEARTBEAT });
  if (doRedirect) {
    history.push("/");
  }
};

export const alert = messages => async dispatch => {
  dispatch({
    type: types.FLASHMESSAGE,
    payload: [messages].flat()
  });
};

////////////////////////////
// Discord OAuth2 Actions //
////////////////////////////

export const handleDiscordData = discordId => async dispatch => {
  try {
    const response = await es.get(`/user/_search?q=discord_id:${discordId}`);
    dispatch({
      type: types.HANDLE_DISCORD_DATA,
      payload: response.data.hits.hits
    });
  } catch (e) {
    dispatch({
      type: types.HANDLE_DISCORD_DATA,
      payload: []
    });
  }
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
  const response = await es.get(`/user/_doc/_search?q=id:${userId}`);
  dispatch({
    type: types.FETCH_AUTH_USER,
    payload: response.data.hits.hits
  });
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

//////////////////////
// EQ2 Data Actions //
//////////////////////

export const fetchEQ2CharacterData = (name, world) => async dispatch => {
  const response = await eq2Data.get(
    `/character/?c:show=equipmentslot_list,spell_list,equipped_mount,mount_list,collections,stats,dbid,resists,type,tradeskills,statistics,locationdata,name,guild,house_list,skills,experience,faction_list,language_list&name.first_lower=${name}&locationdata.world=${world}&c:resolve=factions,equipmentslots`
  );
  dispatch({ type: types.FETCH_EQ2_CHARACTER_DATA, payload: response.data });
};

export const fetchEQ2GuildData = (name, world) => async dispatch => {
  const response = await eq2Data.get(
    `/guild/?name=${name}&world=${world}&c:resolve=members(dbid,name.first,type.level,stats.sta.effective,stats.power.max,stats.health.max,stats.wis.effective,stats.int.effective,stats.str.effective,stats.agi.effective,stats.defense,stats.combat,type.class)`
  );
  dispatch({ type: types.FETCH_EQ2_GUILD_DATA, payload: response.data });
};
