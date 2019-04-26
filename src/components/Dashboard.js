import React from "react";
import { connect } from "react-redux";
import CharacterList from "./characters/CharacterList";
import GuildList from "./guilds/GuildList";
import EventList from "./events/EventList";
import { fetchOne } from "../actions";

// var util = require("util");

class Dashboard extends React.Component {
  renderPageTitle = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return <h1>{this.props.currentUser.discord_username}'s Dashboard</h1>;
    }
  };

  render() {
    return (
      <div>
        {this.renderPageTitle()}
        <div className="ui hidden divider" />
        <EventList />
        <div className="ui hidden divider" />
        <GuildList />
        <div className="ui hidden divider" />
        <CharacterList />
        <div className="ui hidden divider" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchOne }
)(Dashboard);
