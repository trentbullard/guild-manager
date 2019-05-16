import _ from "lodash";

export const getGuildIds = guilds => {
  return Object.keys(_.mapKeys(guilds, "guildid"));
};

export const includesGuild = (guilds, guild) => {
  return getGuildIds(guilds).includes(guild.guildid.toString());
};

export const getCharacterNames = characters => {
  return Object.keys(
    _.mapKeys(characters, c => {
      return c.name.first_lower;
    })
  );
};

export const includesCharacter = (characters, character) => {
  return getCharacterNames(characters).includes(character.name.first_lower);
};
