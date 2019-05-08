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
  renderTitle = () => {
    const characterName =
      this.props.character.name.first || this.props.character.name;
    const guildName = this.props.character.guild
      ? this.props.character.guild.name
      : null;
    var guildLink = null;
    if (guildName && this.props.guilds[guildName]) {
      guildLink = (
        <Link to={`/guilds/${this.props.guilds[guildName].id}`}>
          <div className="blue sub header">{guildName}</div>
        </Link>
      );
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
    guilds: _.mapKeys(Object.values(state.guilds), "name")
  };
};

export default connect(
  mapStateToProps,
  { fetchOne, fetchSome, create, fetchEQ2CharacterData, edit }
)(CharacterShow);
