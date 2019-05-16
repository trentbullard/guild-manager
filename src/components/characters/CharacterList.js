import React from "react";
import { Link } from "react-router-dom";

// var util = require("util");

const renderAdmin = (currentUser, character) => {
  if (currentUser) {
    return (
      <div className="right floated content">
        <Link
          to={`/characters/edit/${character.name.first_lower}`}
          className="button ui primary"
        >
          Edit
        </Link>
        <Link
          to={`/characters/delete/${character.name.first_lower}`}
          className="button ui negative"
        >
          Delete
        </Link>
      </div>
    );
  }
};

const renderList = (currentUser, characters) => {
  if (!characters || Object.keys(characters).length < 1) {
    return <div>None Found</div>;
  }
  return Object.values(characters).map(character => {
    return (
      <div className="item" key={character.name.first_lower}>
        {renderAdmin(currentUser, character)}
        <i className="large middle aligned icon address card outline" />
        <div className="content">
          <Link
            to={`/characters/${character.name.first_lower}`}
            className="header"
          >
            {character.name.first}
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
      <Link to="/characters/new" className="ui green label">
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
        {renderCreate(props.currentUser)}
      </h3>
      <div className="ui celled list">
        {renderList(props.currentUser, props.characters)}
      </div>
    </div>
  );
};

export default CharacterList;
