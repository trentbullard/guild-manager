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

var util = require("util");

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
      this.props.fetchSome(
        "user_characters",
        `user_id=${this.props.currentUser.id}`
      );
    }
  };

  fetchCharacters = () => {
    if (this.charactersToFetch.length > 0) {
      const query = this.charactersToFetch
        .map(id => {
          if (!this.charactersFetched.includes(id)) {
            this.charactersFetched.push(id);
            return `id=${id}`;
          }
        })
        .join("&");
      this.charactersToFetch.length = 0;
      this.props.fetchSome("characters", query);
    }
  };

  fetchGuilds = () => {
    if (this.guildsToFetch.length > 0) {
      const query = this.guildsToFetch
        .map(g => {
          this.guildsFetched.push(g);
          return `guildid=${g.guildid}`;
        })
        .join("&");
      this.guildsToFetch.length = 0;
      this.props.fetchSome("guilds", query);
    }
  };

  processUserCharacters = () => {
    Object.values(this.props.userCharacters).map(uc => {
      if (!(uc.character_id in this.props.characters)) {
        if (!this.charactersToFetch.includes(uc.character_id)) {
          if (!this.charactersFetched.includes(uc.character_id)) {
            this.charactersToFetch.push(uc.character_id);
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
            const name = c.name.first_lower || c.name.toLowerCase();
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
      const name =
        characterToFetchData.name.first_lower ||
        characterToFetchData.name.toLowerCase();
      this.charactersDataFetched.push(characterToFetchData);
      this.props.fetchEQ2CharacterData(name, "Kaladim");
    }
  };

  updateCharacters = () => {
    if (this.charactersToUpdate.length > 0) {
      const characterToUpdate = this.charactersToUpdate.shift();
      const name =
        characterToUpdate.name.first_lower ||
        characterToUpdate.name.toLowerCase();
      const characterData = this.props.characterData[name];
      this.charactersUpdated.push(characterToUpdate);
      this.props.edit("character", characterToUpdate.id, {
        ...characterData,
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
      this.props.create("guild", values);
    }
  };

  updateGuilds = () => {
    if (this.guildsToUpdate.length > 0) {
      const guildToUpdate = this.guildsToUpdate.shift();
      if (guildToUpdate.guildid in this.props.guildData) {
        const storedGuildData = this.props.guildData[guildToUpdate.guildid];
        this.guildsUpdated.push(guildToUpdate);
        this.props.edit("guild", this.props.guilds[guildToUpdate.guildid].id, {
          ...storedGuildData,
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
