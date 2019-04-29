/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { fetchOne, fetchEQ2GuildData, edit } from "../../actions";
import MemberTable from "./MemberTable";

// var util = require("util");

class GuildShow extends React.Component {
  constructor(props) {
    super(props);
    this.doCreateGuild = true;
    this.doSearchForGuild = true;
    this.refreshTimer = new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString();
    this.refreshingAPIData = false;
    this.updatingLocalData = false;
  }

  componentDidMount() {
    this.props.fetchOne("guild", this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.guild) {
      if (
        this.props.guild.updated_at ||
        this.props.guild.updated_at < this.props.refreshTimer
      ) {
        if (this.props.guildData) {
          if (
            !this.updatingLocalData &&
            this.props.guildData.guildid == this.props.guild.guildid
          ) {
            this.updatingLocalData = true;
            this.props.edit("guild", this.props.guild.id, {
              ...this.props.guildData,
              updated_at: new Date().toISOString()
            });
          }
        } else if (!this.refreshingAPIData) {
          this.refreshingAPIData = true;
          this.props.fetchEQ2GuildData(this.props.guild.name, "Kaladim");
        }
      }
    }
  }

  renderTitle = () => {
    return (
      <div className="ui row">
        <h1 className="ui header">
          {this.props.guild.name}
          <div className="ui sub header">
            {`Level ${this.props.guild.level} guild on ${
              this.props.guild.world
            }`}
          </div>
        </h1>
      </div>
    );
  };

  renderTabs = () => {
    return (
      <Tabs
        disabledTabClassName="disabled"
        selectedTabClassName="active"
        selectedTabPanelClassName="active"
      >
        <TabList className="ui pointing secondary menu">
          <Tab className="item">Members</Tab>
          <Tab className="item">Details</Tab>
        </TabList>
        <TabPanel className="ui tab segment">
          <MemberTable members={this.props.guild.member_list} />
        </TabPanel>
        <TabPanel className="ui tab segment" />
      </Tabs>
    );
  };

  render() {
    if (this.props.guild) {
      return (
        <div className="ui sixteen column grid">
          <div className="ui row">
            <div className="ui sixteen wide column">{this.renderTitle()}</div>
          </div>
          <div className="ui row">
            <div className="ui sixteen wide column">{this.renderTabs()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Could not find guild with id: {this.props.match.params.id}</div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    guild: state.guilds.items[ownProps.match.params.id],
    guildData: state.guilds.guildData
  };
};

export default connect(
  mapStateToProps,
  { fetchOne, fetchEQ2GuildData, edit }
)(GuildShow);
