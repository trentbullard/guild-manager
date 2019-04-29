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

import StatsTab from "./StatsTab";
import ItemsTab from "./ItemsTab";
import SkillsTab from "./SkillsTab";
import AAsTab from "./AAsTab";

// var util = require("util");
class CharacterShow extends React.Component {
  constructor(props) {
    super(props);
    this.doCreateGuild = true;
    this.doSearchForGuild = true;
    this.refreshTimer = new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString();
    this.refreshing = false;
  }

  componentDidMount() {
    this.props.fetchOne("character", this.props.match.params.id);
  }

  componentDidUpdate() {
    this.refreshing = false;
    if (this.props.character) {
      if (
        !this.props.character.updated_at ||
        this.props.character.updated_at < this.refreshTimer
      ) {
        if (this.props.characterData) {
          this.props.edit("character", this.props.character.id, {
            ...this.props.characterData[0],
            updated_at: new Date().toISOString()
          });
        } else {
          this.props.fetchEQ2CharacterData(
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
              _.each(this.props.guilds.items, guild => {
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
    if (
      !this.refreshing ||
      this.props.character.updated_at < this.refreshTimer
    ) {
      this.refreshing = true;
      this.props.fetchEQ2CharacterData(
        this.props.character.name.first || this.props.character.name,
        "Kaladim"
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
              <Tab className="item" disabled>
                Skills
              </Tab>
              <Tab className="item" disabled>
                AAs
              </Tab>
            </TabList>
            <TabPanel className="ui tab segment">
              <StatsTab
                character={this.props.character}
                refresh={this.refreshCharacterData}
              />
            </TabPanel>
            <TabPanel className="ui tab segment">
              <ItemsTab
                character={this.props.character}
                refresh={this.refreshCharacterData}
              />
            </TabPanel>
            <TabPanel className="ui tab segment">
              <SkillsTab character={this.props.character} />
            </TabPanel>
            <TabPanel className="ui tab segment">
              <AAsTab character={this.props.character} />
            </TabPanel>
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
    guilds: state.guilds
  };
};

export default connect(
  mapStateToProps,
  { fetchOne, fetchSome, create, fetchEQ2CharacterData, edit }
)(CharacterShow);
