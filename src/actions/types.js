export const fetch = oType => {
  return `FETCH_${oType.toUpperCase()}`;
};

export const fetchSome = oType => {
  return `FETCH_SOME_${oType.toUpperCase()}`;
};

export const edit = oType => {
  return `EDIT_${oType.toUpperCase()}`;
};

export const create = oType => {
  return `CREATE_${oType.toUpperCase()}`;
};

export const destroy = oType => {
  return `DELETE_${oType.toUpperCase()}`;
};

export const HANDLE_AUTH_CODE = "HANDLE_AUTH_CODE";
export const HANDLE_ACCESS_TOKEN = "HANDLE_ACCESS_TOKEN";
export const HANDLE_DISCORD_DATA = "HANDLE_DISCORD_DATA";

export const FETCH_AUTH_USER = "FETCH_AUTH_USER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const FETCH_EQ2_CHARACTER_DATA = "FETCH_EQ2_CHARACTER_DATA";
export const FETCH_EQ2_CHARACTER_LIST = "FETCH_EQ2_CHARACTER_LIST";
export const FETCH_EQ2_GUILD_DATA = "FETCH_EQ2_GUILD_DATA";
export const FETCH_EQ2_ITEM_DATA = "FETCH_EQ2_ITEM_DATA";
