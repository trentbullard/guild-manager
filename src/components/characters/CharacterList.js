import React from "react";
import { Link } from "react-router-dom";

// var util = require("util");

const renderAdmin = (currentUser, character) => {
  if (currentUser) {
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

const renderList = (currentUser, characters) => {
  return Object.values(characters).map(character => {
    return (
      <div className="item" key={character.id}>
        {renderAdmin(currentUser, character)}
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

const renderCreate = currentUser => {
  if (currentUser) {
    return (
      <Link to="/events/new" className="ui green label">
        <i className="plus icon" /> New
      </Link>
    );
  }
};

const renderListHeader = currentUser => {
  if (currentUser) {
    return "Characters";
  } else {
    return "Characters";
  }
};

const CharacterList = props => {
  return (
    <div>
      <h3 className="ui header">
        {renderListHeader(props.currentUser)}
        {/* {renderCreate()} */}
      </h3>
      <div className="ui celled list">
        {renderList(props.currentUser, props.characters)}
      </div>
    </div>
  );
};

export default CharacterList;
