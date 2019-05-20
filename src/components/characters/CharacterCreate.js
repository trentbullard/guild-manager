import React from "react";
import { connect } from "react-redux";
import { create, fetchSome, fetchNames, heartbeat } from "../../actions";
import CharacterForm from "./CharacterForm";
import DiscordAuth from "../auth/DiscordAuth";

class CharacterCreate extends React.Component {
  constructor(props) {
    super(props);
    this.formValues = null;
    this.doFetchNames = true;
    this.doCreateCharacter = true;
    this.doCreateUserCharacter = true;
  }

  componentDidUpdate() {
    if (this.doFetchNames) {
      this.doFetchNames = false;
      this.props.fetchNames();
    }
    if (this.props.currentUser && this.doFetchUserCharacters) {
      this.doFetchUserCharacters = false;
      this.props.fetchSome(
        "user_character",
        `user:${this.props.currentUser.id}`
      );
    }
    if (this.formValues) {
      const characterName = this.formValues.name.toLowerCase();
      if (!this.props.names.includes(characterName) && this.doCreateCharacter) {
        this.doCreateCharacter = false;
        this.doFetchNames = true;
        this.props.create("character", characterName, {
          name: { first_lower: characterName, first: this.formValues.name },
          description: this.formValues.description,
          locationdata: { world: this.formValues.locationdata }
        });
      } else if (
        !(characterName in this.props.userCharacters) &&
        this.doCreateUserCharacter
      ) {
        this.doCreateUserCharacter = false;
        this.props.create(
          "user_character",
          `${this.props.currentUser.id}_${characterName}`,
          {
            user: this.props.currentUser.id,
            character: characterName
          },
          true
        );
      } else {
        this.props.heartbeat(true);
      }
    }
  }

  onSubmit = formValues => {
    this.formValues = formValues;
  };

  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <h3>Add a Character</h3>
          <CharacterForm onSubmit={this.onSubmit} />
        </div>
      );
    } else {
      return (
        <div>
          You must <DiscordAuth /> to add a user.
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userCharacters: state.userCharacters,
    characters: state.characters,
    names: state.characterNames
  };
};

export default connect(
  mapStateToProps,
  { create, fetchSome, fetchNames, heartbeat }
)(CharacterCreate);
