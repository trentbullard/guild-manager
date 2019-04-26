/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOne,
  fetchSome,
  create,
  fetchEQ2CharacterData,
  edit
} from "../../actions";
import VitalStats from "./details/stats/VitalStats";
import ResistStats from "./details/stats/ResistStats";
import ActivityStats from "./details/stats/ActivityStats";
import LanguageStats from "./details/stats/LanguageStats";
import LocationStats from "./details/stats/LocationStats";
import ExperienceStats from "./details/stats/ExperienceStats";
import FactionStats from "./details/stats/FactionStats";

// var util = require("util");
class CharacterShow extends React.Component {
  constructor(props) {
    super(props);
    this.doCreateGuild = true;
    this.doSearchForGuild = true;
    this.refreshing = false;
  }

  componentDidMount() {
    this.props.fetchOne("character", this.props.match.params.id);
  }

  componentDidUpdate() {
    this.refreshing = false;
    const yesterday = new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString();
    if (this.props.character) {
      if (
        !this.props.character.updated_at ||
        this.props.character.updated_at < yesterday
      ) {
        if (this.props.characterData) {
          this.props.edit("character", this.props.character.id, {
            ...this.props.characterData[0],
            updated_at: new Date().toISOString()
          });
        } else {
          this.props.fetchEQ2CharacterData(
            "character",
            this.props.character.name.first || this.props.character.name,
            "Kaladim"
          );
        }
      } else {
        if (this.props.character.guild) {
          if (this.props.guilds.searched) {
            if (
              Object.keys(this.props.guilds.items).length < 1 &&
              this.doCreateGuild
            ) {
              this.doCreateGuild = false;
              this.createGuildFromData(this.props.character.guild);
            } else if (Object.keys(this.props.guilds.items).length > 1) {
              _.each(this.props.guilds.items, (name, guild) => {
                if (guild.guildid == this.props.character.guild.guildid) {
                  this.props.fetchOne("guild", guild.id);
                  return false;
                }
              });
            }
          } else if (
            Object.keys(this.props.guilds.items).length < 1 &&
            this.doSearchForGuild
          ) {
            this.doSearchForGuild = false;
            this.props.fetchSome(
              "guilds",
              `name=${this.props.character.guild.name}`
            );
          }
        }
      }
    }
  }

  createGuildFromData = data => {
    const values = {
      name: data.name,
      guildid: data.guildid
    };
    this.props.create("guild", values);
  };

  refreshCharacterData = () => {
    if (!this.refreshing) {
      this.refreshing = true;
      this.props.fetchEQ2CharacterData(
        "character",
        this.props.character.name.first || this.props.character.name,
        "Kaladim"
      );
    }
  };

  renderStatsTab = () => {
    if (this.props.character && this.props.character.dbid) {
      return (
        <div>
          <h3 className="ui header">
            {`Level ${this.props.character.type.level} ${
              this.props.character.type.race
            } ${this.props.character.type.class} on ${
              this.props.character.locationdata.world
            }`}
            <div className="ui sub header">
              {`updated: ${new Date(
                this.props.character.updated_at
              ).toLocaleString()} `}
              <a onClick={this.refreshCharacterData} data-inverted="" data-tooltip="usable every 15 minutes" data-position="right center">
                <i className="sync alternate icon" />
              </a>
            </div>
          </h3>
          <div className="ui hidden divider" />
          <div className="ui sixteen column grid">
            <VitalStats stats={this.props.character.stats} />
            <ResistStats resists={this.props.character.resists} />
            <div className="ui sixteen wide centered column divider" />
            <LanguageStats languages={this.props.character.language_list} />
            <ActivityStats stats={this.props.character.statistics} />
            <LocationStats locationdata={this.props.character.locationdata} />
            <ExperienceStats stats={this.props.character.experience} />
            <FactionStats factions={this.props.character.faction_list} />
            <div className="ui hidden divider" />
          </div>
        </div>
      );
    }
  };

  renderTitle = () => {
    const characterName =
      this.props.character.name.first || this.props.character.name;
    const guildName = this.props.character.guild
      ? this.props.character.guild.name
      : null;
    var guildLink = null;
    if (guildName) {
      if (this.props.guilds.items[guildName]) {
        guildLink = (
          <Link to={`/guilds/${this.props.guilds.items[guildName].id}`}>
            <div className="blue sub header">{guildName}</div>
          </Link>
        );
      }
    }
    if (this.props.character.guild) {
      return (
        <h1 className="ui header">
          {characterName}
          {guildLink}
        </h1>
      );
    }
    return (
      <h1 className="ui header">
        {this.props.character.name.first || this.props.character.name}
      </h1>
    );
  };

  render() {
    if (this.props.character && this.props.character.id) {
      return (
        <div>
          {this.renderTitle()}
          <div className="ui hidden divider" />
          <Tabs
            disabledTabClassName="disabled"
            selectedTabClassName="active"
            selectedTabPanelClassName="active"
          >
            <TabList className="ui pointing secondary menu">
              <Tab className="item">Stats</Tab>
              <Tab className="item">Items</Tab>
              <Tab className="item">Skills</Tab>
              <Tab className="item" disabled>
                AAs
              </Tab>
            </TabList>
            <TabPanel className="ui tab segment">
              {this.renderStatsTab()}
            </TabPanel>
            <TabPanel className="ui tab segment">Items</TabPanel>
            <TabPanel className="ui tab segment">Skills</TabPanel>
            <TabPanel className="ui tab segment">AAs</TabPanel>
          </Tabs>
        </div>
      );
    }
    return <p>Character {this.props.match.params.id} wasn't found</p>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters[ownProps.match.params.id],
    characterData: state.characters.characterData,
    guildCharacters: state.guildCharacters,
    guilds: state.guilds
  };
};

export default connect(
  mapStateToProps,
  { fetchOne, fetchSome, create, fetchEQ2CharacterData, edit }
)(CharacterShow);
