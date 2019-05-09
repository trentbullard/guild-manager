/* eslint-disable eqeqeq */
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MemberTable from "./MemberTable";
import DetailsTab from "./DetailsTab";

// var util = require("util");

class GuildShow extends React.Component {
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
        <TabPanel className="ui tab segment">
          <DetailsTab guild={this.props.guild} />
        </TabPanel>
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
    guild: _.mapKeys(Object.values(state.guilds), "id")[
      ownProps.match.params.id
    ]
  };
};

export default connect(
  mapStateToProps,
  null
)(GuildShow);
