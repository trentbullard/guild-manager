import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll, fetchSome } from "../../actions";

class GuildList extends React.Component {
  constructor(props) {
    super(props);
    this.doSearchForUserGuilds = true;
    this.doSearchForGuilds = true;
  }

  componentDidUpdate() {
    if (this.props.currentUser && this.props.currentUser.id) {
      if (this.props.userGuilds.length > 0 && this.doSearchForGuilds) {
        this.doSearchForGuilds = false;
        const guildIds = Object.keys(
          _.mapKeys(this.props.userGuilds, "guild_id")
        );
        const query = guildIds.map(id => `id=${id}`).join("&");
        this.props.fetchSome("guilds", query);
        return;
      } else if (this.doSearchForUserGuilds) {
        this.doSearchForUserGuilds = false;
        this.props.fetchSome(
          "user_guilds",
          `user_id=${this.props.currentUser.id}`
        );
      }
    }
  }

  onClickLeave = () => {};

  renderAdmin = guild => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div className="right floated content">
          <button onClick={this.onClickLeave} className="button ui negative">
            Leave
          </button>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.guilds.map(guild => {
      const tags = guild.personalitytag_list || [];
      const iTag = Math.floor(Math.random() * Math.floor(tags.length));
      const description = guild.personalitytag_list[iTag].text;
      return (
        <div className="item" key={guild.id}>
          {this.renderAdmin(guild)}
          <i className="large middle aligned icon building outline" />
          <div className="content">
            <Link to={`/guilds/${guild.id}`} className="header">
              {guild.name}
            </Link>
            <div className="description">{description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <Link to="/events/new" className="ui green label">
          <i className="plus icon" /> New
        </Link>
      );
    }
  };

  renderListHeader = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return "Guilds";
    } else {
      return "Guilds";
    }
  };

  render() {
    return (
      <div>
        <h3 className="ui header">
          {this.renderListHeader()}
          {/* {this.renderCreate()} */}
        </h3>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guilds: Object.values(state.guilds.items),
    userGuilds: Object.values(state.userGuilds),
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchAll, fetchSome }
)(GuildList);
