import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSome } from "../../actions";

var util = require("util");

class CharacterList extends React.Component {
  componentDidMount() {
    this.props.fetchSome(
      "user_characters",
      `user_id=${this.props.currentUser.id}`
    );
  }

  componentDidUpdate() {
    if (this.props.currentUser && this.props.currentUser.id) {
      if (this.props.characters.length > 0) {
        return;
      }
      if (this.props.userCharacters.length > 0) {
        const characterIds = Object.keys(
          _.mapKeys(this.props.userCharacters, "character_id")
        );
        const query = characterIds.map(id => `id=${id}`).join("&");
        this.props.fetchSome("characters", query);
        return;
      } else {
        this.props.fetchSome(
          "user_characters",
          `user_id=${this.props.currentUser.id}`
        );
      }
    }
  }

  renderAdmin = character => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div className="right floated content">
          <Link
            to={`/characters/edit/${character.id}`}
            className="button ui primary"
          >
            Edit
          </Link>
          <Link
            to={`/characters/delete/${character.id}`}
            className="button ui negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.characters.map(character => {
      return (
        <div className="item" key={character.id}>
          {this.renderAdmin(character)}
          <i className="large middle aligned icon address card outline" />
          <div className="content">
            <Link to={`/characters/${character.id}`} className="header">
              {character.name.first || character.name}
            </Link>
            <div className="description">{character.description}</div>
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
      return "Characters";
    } else {
      return "Characters";
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
    characters: Object.values(state.characters),
    userCharacters: Object.values(state.userCharacters),
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchSome }
)(CharacterList);
