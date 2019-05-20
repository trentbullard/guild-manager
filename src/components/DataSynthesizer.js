/* eslint-disable array-callback-return */
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  fetchOne,
  fetchSome,
  create,
  edit,
  fetchEQ2CharacterData,
  fetchEQ2GuildData,
  heartbeat
} from "../actions";
import { includesGuild, includesCharacter } from "../helpers/objects";

// var util = require("util");

class DataSynthesizer extends React.Component {
  constructor(props) {
    super(props);
    this.doFetchUserCharacters = true;
    this.charactersToFetch = [];
    this.charactersFetched = [];
    this.charactersToFetchData = [];
    this.charactersDataFetched = [];
    this.charactersToUpdate = [];
    this.charactersUpdated = [];
    this.guildsToFetchData = [];
    this.guildsDataFetched = [];
    this.guildsToFetch = [];
    this.guildsFetched = [];
    this.guildsToUpdate = [];
    this.guildsUpdated = [];
    this.guildsToCreate = [];
    this.guildsCreated = [];
    this.refreshTimer = new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString();
    this.ctr = 0;
  }

  fetchUserCharacters = () => {
    if (this.doFetchUserCharacters && this.props.currentUser) {
      this.doFetchUserCharacters = false;
      const query = {
        params: {
          source: JSON.stringify({
            query: {
              match: {
                user: this.props.currentUser.id
              }
            }
          }),
          source_content_type: "application/json"
        }
      };
      this.props.fetchSome("user_character", query, true);
    }
  };

  fetchCharacters = () => {
    if (this.charactersToFetch.length > 0) {
      const query = {
        params: {
          source: JSON.stringify({
            query: {
              bool: {
                must: [
                  {
                    terms: {
                      "name.first_lower": _.uniq(this.charactersToFetch)
                    }
                  }
                ]
              }
            }
          }),
          source_content_type: "application/json"
        }
      };
      this.charactersToFetch.length = 0;
      this.props.fetchSome("character", query);
    }
  };

  fetchGuilds = () => {
    if (this.guildsToFetch.length > 0) {
      const query = {
        params: {
          source: JSON.stringify({
            query: {
              bool: {
                must: [
                  {
                    terms: {
                      guildid: this.guildsToFetch.map(g => {
                        return g.guildid;
                      })
                    }
                  }
                ]
              }
            }
          }),
          source_content_type: "application/json"
        }
      };
      this.guildsToFetch.length = 0;
      this.props.fetchSome("guild", query);
    }
  };

  processUserCharacters = () => {
    Object.values(this.props.userCharacters).map(uc => {
      if (!(uc.character in this.props.characters)) {
        if (!this.charactersToFetch.includes(uc.character)) {
          if (!this.charactersFetched.includes(uc.character)) {
            this.charactersToFetch.push(uc.character);
          }
        }
      }
    });
  };

  processCharacters = () => {
    Object.values(this.props.characters).map(c => {
      if (!c.updated_at || c.updated_at < this.refreshTimer) {
        if (!includesCharacter(this.charactersToFetchData, c)) {
          if (!includesCharacter(this.charactersDataFetched, c)) {
            this.charactersToFetchData.push(c);
          } else {
            const name = c.name.first_lower;
            if (name in this.props.characterData) {
              if (!includesCharacter(this.charactersToUpdate, c)) {
                if (!includesCharacter(this.charactersUpdated, c)) {
                  this.charactersToUpdate.push(c);
                }
              }
            }
          }
        }
      } else {
        if (c.guild) {
          if (!(c.guild.guildid in this.props.guilds)) {
            if (!includesGuild(this.guildsToFetch, c.guild)) {
              if (!includesGuild(this.guildsFetched, c.guild)) {
                this.guildsToFetch.push(c.guild);
              } else {
                if (!includesGuild(this.guildsToCreate, c.guild)) {
                  if (!includesGuild(this.guildsCreated, c.guild)) {
                    this.guildsToCreate.push(c.guild);
                  }
                }
              }
            }
          }
        }
      }
    });
  };

  processGuilds = () => {
    Object.values(this.props.guilds).map(g => {
      if (!g.updated_at || g.updated_at < this.refreshTimer) {
        if (!includesGuild(this.guildsToFetchData, g)) {
          if (!includesGuild(this.guildsDataFetched, g)) {
            this.guildsToFetchData.push(g);
          } else {
            if (g.guildid in this.props.guildData) {
              if (!includesGuild(this.guildsToUpdate, g)) {
                if (!includesGuild(this.guildsUpdated, g)) {
                  this.guildsToUpdate.push(g);
                }
              }
            }
          }
        }
      }
    });
  };

  fetchCharacterData = () => {
    if (this.charactersToFetchData.length > 0) {
      const characterToFetchData = this.charactersToFetchData.shift();
      const name = characterToFetchData.name.first_lower;
      this.charactersDataFetched.push(characterToFetchData);
      this.props.fetchEQ2CharacterData(name, "Kaladim");
    }
  };

  updateCharacters = () => {
    if (this.charactersToUpdate.length > 0) {
      const characterToUpdate = this.charactersToUpdate.shift();
      const name = characterToUpdate.name.first_lower;
      const characterData = this.props.characterData[name];
      this.charactersUpdated.push(characterToUpdate);
      this.props.edit("character", characterToUpdate.name.first_lower, {
        ...characterData,
        description: characterToUpdate.description,
        updated_at: new Date().toISOString()
      });
    }
  };

  fetchGuildData = () => {
    if (this.guildsToFetchData.length > 0) {
      const guildToFetchData = this.guildsToFetchData.shift();
      this.guildsDataFetched.push(guildToFetchData);
      this.props.fetchEQ2GuildData(guildToFetchData.name, "Kaladim");
    }
  };

  createGuilds = () => {
    if (this.guildsToCreate.length > 0) {
      const g = this.guildsToCreate.shift();
      const values = {
        guildid: g.guildid,
        name: g.name
      };
      this.guildsCreated.push(g);
      this.guildsToFetch.push(g);
      this.props.create("guild", g.guildid, values);
    }
  };

  updateGuilds = () => {
    if (this.guildsToUpdate.length > 0) {
      const guildToUpdate = this.guildsToUpdate.shift();
      if (guildToUpdate.guildid in this.props.guildData) {
        const storedGuildData = this.props.guildData[guildToUpdate.guildid];
        const member_list = storedGuildData.member_list.map(m => {
          if (m.name.first) {
            return m;
          } else {
            return { ...m, name: { first: m.name } };
          }
        });

        this.guildsUpdated.push(guildToUpdate);
        this.props.edit("guild", guildToUpdate.guildid, {
          ...storedGuildData,
          member_list: member_list,
          updated_at: new Date().toISOString()
        });
      }
    }
  };

  checkState = () => {
    this.fetchUserCharacters();
    this.processUserCharacters();
    this.fetchCharacters();
    this.processCharacters();
    this.fetchCharacterData();
    this.updateCharacters();

    this.processGuilds();
    this.fetchGuilds();
    this.createGuilds();
    this.fetchGuildData();
    this.updateGuilds();
  };

  componentDidMount() {
    this.checkState();
  }

  componentDidUpdate() {
    this.checkState();
  }

  render() {
    return <div id="DataSynthesizer" />;
  }
}

const mapStateToProps = state => {
  return {
    heartbeat: state.heartbeat,
    currentUser: state.currentUser,
    userCharacters: state.userCharacters,
    characters: state.characters,
    characterData: state.characterData,
    guilds: state.guilds,
    guildData: state.guildData
  };
};

export default connect(
  mapStateToProps,
  {
    fetchOne,
    fetchSome,
    create,
    edit,
    fetchEQ2CharacterData,
    fetchEQ2GuildData,
    heartbeat
  }
)(DataSynthesizer);
