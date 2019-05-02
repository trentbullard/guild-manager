import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import CharacterList from "./characters/CharacterList";
import GuildList from "./guilds/GuildList";
import EventList from "./events/EventList";
import {
  fetchOne,
  fetchSome,
  create,
  edit,
  fetchEQ2CharacterData,
  fetchEQ2GuildData
} from "../actions";

// var util = require("util");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.doFetchUserCharacters = true;
    this.doFetchCharacters = true;
    this.doFetchCharacterData = true;
    this.characterDataCtr = 0;
    this.doUpdateCharacters = true;
    this.characterUpdateCtr = 0;
    this.doFetchGuilds = true;
    this.doFetchGuildData = true;
    this.guildsToFetchData = [];
    this.doUpdateGuilds = true;
    this.guildsToUpdate = [];
    this.refreshTimer = new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString();
  }

  fetchUserCharacters = () => {
    if (this.props.currentUser && this.doFetchUserCharacters) {
      this.doFetchUserCharacters = false;
      this.props.fetchSome(
        "user_characters",
        `user_id=${this.props.currentUser.id}`
      );
    }
  };

  fetchCharacters = () => {
    if (
      !this.doFetchUserCharacters &&
      Object.keys(this.props.userCharacters).length > 0 &&
      this.doFetchCharacters
    ) {
      this.doFetchCharacters = false;
      const query = Object.keys(this.props.userCharacters)
        .map(id => {
          return `id=${id}`;
        })
        .join("&");
      this.props.fetchSome("characters", query);
    }
  };

  fetchCharacterData = () => {
    if (
      !this.doFetchCharacters &&
      Object.keys(this.props.characters).length > 0 &&
      this.doFetchCharacterData
    ) {
      Object.values(this.props.characters).map(c => {
        this.characterDataCtr++;
        if (!c.updated_at || c.updated_at < this.refreshTimer) {
          this.props.fetchEQ2CharacterData(c.name.first || c.name, "Kaladim");
        }
      });
      this.doFetchCharacterData =
        this.characterDataCtr < Object.keys(this.props.characters).length;
    }
  };

  updateCharacters = () => {
    if (
      !this.doFetchCharacterData &&
      Object.keys(this.props.characterData).length > 0 &&
      this.doUpdateCharacters
    ) {
      Object.values(this.props.characters).map(c => {
        this.characterUpdateCtr++;
        const name = c.name.first_lower || c.name.toLowerCase();
        if (name in this.props.characterData) {
          this.doFetchGuilds = true;
          this.props.edit("character", c.id, {
            ...this.props.characterData[name],
            updated_at: new Date().toISOString()
          });
        }
      });
      this.doUpdateCharacters =
        this.characterUpdateCtr < Object.keys(this.props.characters).length;
    }
  };

  fetchGuilds = () => {
    if (Object.keys(this.props.characters).length > 0 && this.doFetchGuilds) {
      this.doFetchGuilds = false;
      const query = Object.values(this.props.characters)
        .map(c => {
          if (c.guild) {
            this.guildsToFetchData.push(c.guild);
            return `guildid=${c.guild.guildid}`;
          }
        })
        .join("&");
      this.props.fetchSome("guilds", query);
    }
  };

  fetchGuildData = () => {
    if (
      this.guildsToFetchData.length > 0 &&
      Object.keys(this.props.guilds).length > 0
    ) {
      const g = this.guildsToFetchData.shift();
      if (!(g.guildid in this.props.guilds)) {
        this.createGuild(g);
        this.guildsToUpdate.push(g);
      } else if (!g.updated_at || g.updated_at < this.refreshTimer) {
        this.guildsToUpdate.push(this.props.guilds[g.guildid]);
        this.props.fetchEQ2GuildData(g.name, "Kaladim");
      }
    }
  };

  createGuild = data => {
    const values = {
      guildid: data.guildid,
      name: data.name
    };
    this.props.create("guild", values);
  };

  updateGuilds = () => {
    console.log(
      "this.guildsToUpdate: ",
      this.guildsToUpdate.map(g => {
        return g.name;
      })
    );
    if (
      this.guildsToUpdate.length > 0 &&
      Object.keys(this.props.guildData).length > 0
    ) {
      const g = this.guildsToUpdate.shift();
      if (g.guildid in this.props.guildData) {
        this.props.edit("guild", g.id, {
          ...this.props.guildData[g.guildid],
          updated_at: new Date().toISOString()
        });
      }
    }
  };

  checkState() {
    this.fetchUserCharacters();
    this.fetchCharacters();
    this.fetchCharacterData();
    this.updateCharacters();
    this.fetchGuilds();
    this.fetchGuildData();
    this.updateGuilds();
  }

  componentDidMount() {
    this.checkState();
  }

  componentDidUpdate() {
    this.checkState();
  }

  renderPageTitle = () => {
    if (this.props.currentUser) {
      return <h1>{this.props.currentUser.discord_username}'s Dashboard</h1>;
    }
  };

  render() {
    return (
      <div>
        {this.renderPageTitle()}
        <div className="ui hidden divider" />
        <EventList currentUser={this.props.currentUser} />
        <div className="ui hidden divider" />
        <GuildList
          currentUser={this.props.currentUser}
          guilds={this.props.guilds}
        />
        <div className="ui hidden divider" />
        <CharacterList
          currentUser={this.props.currentUser}
          characters={this.props.characters}
        />
        <div className="ui hidden divider" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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
    fetchEQ2GuildData
  }
)(Dashboard);
