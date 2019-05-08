import React from "react";
import { connect } from "react-redux";
import CharacterList from "./characters/CharacterList";
import GuildList from "./guilds/GuildList";
import EventList from "./events/EventList";

class Dashboard extends React.Component {
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
        <EventList
          currentUser={this.props.currentUser}
          events={this.props.events}
        />
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
    characters: state.characters,
    guilds: state.guilds,
    events: state.events
  };
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
