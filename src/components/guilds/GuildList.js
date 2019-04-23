import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll } from "../../actions";

class GuildList extends React.Component {
  componentDidMount() {
    this.props.fetchAll("guild");
  }

  renderAdmin = guild => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div className="right floated content">
          <Link to={`/guilds/edit/${guild.id}`} className="button ui primary">
            Edit
          </Link>
          <Link
            to={`/guilds/delete/${guild.id}`}
            className="button ui negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.guilds.map(guild => {
      return (
        <div className="item" key={guild.id}>
          {this.renderAdmin(guild)}
          <i className="large middle aligned icon building outline" />
          <div className="content">
            <Link to={`/guilds/${guild.id}`} className="header">
              {guild.name}
            </Link>
            <div className="description">{guild.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/guilds/new" className="ui button positive">
            <i className="plus icon" /> Add Guild
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Guilds</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guilds: Object.values(state.guilds),
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchAll }
)(GuildList);
