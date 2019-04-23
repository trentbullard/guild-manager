import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll } from "../../actions";

class CharacterList extends React.Component {
  componentDidMount() {
    this.props.fetchAll("character");
  }

  renderAdmin = character => {
    // if (character.user.id === this.props.currentUser.id) {
    if (true) {
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
              {character.name}
            </Link>
            <div className="description">{character.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/characters/new" className="ui button primary">
            Add Character
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Characters</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: Object.values(state.characters),
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchAll }
)(CharacterList);
