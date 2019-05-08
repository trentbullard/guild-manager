import _ from "lodash";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { create, fetchSome, heartbeat } from "../../actions";
import CharacterForm from "./CharacterForm";
import DiscordAuth from "../auth/DiscordAuth";
import { includesCharacter } from "../../helpers/objects";

class CharacterCreate extends React.Component {
  constructor(props) {
    super(props);
    this.formValues = null;
    this.characterName = null;
    this.server = null;
    this.doCreateCharacter = true;
    this.doCreateUserCharacter = true;
  }

  componentDidUpdate() {
    if (this.characterName) {
      const newCharacter = { name: this.characterName.toLowerCase() };
      if (
        !includesCharacter(this.props.characters, newCharacter) &&
        this.doCreateCharacter
      ) {
        this.doCreateCharacter = false;
        this.props.create("character", this.formValues);
      } else {
        const character = _.mapKeys(this.props.characters, c => {
          return c.name.first_lower || c.name.toLowerCase();
        })[this.characterName.toLowerCase()];
        if (character && this.doCreateUserCharacter) {
          if (!(character.id in this.props.userCharacters)) {
            this.doCreateUserCharacter = false;
            this.props.create(
              "user_character",
              {
                user_id: this.props.currentUser.id,
                character_id: character.id
              },
              true
            );
          } else {
            this.props.heartbeat(true);
          }
        }
      }
    }
  }

  onSubmit = formValues => {
    this.formValues = formValues;
    this.characterName = formValues.name.toLowerCase();
    this.server = formValues.server;
    this.props.fetchSome("characters", `q=${formValues.name}`);
  };

  render(redirect = false) {
    if (redirect) {
      return <Redirect to="/" />;
    } else if (this.props.currentUser) {
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
    characters: Object.values(state.characters)
  };
};

export default connect(
  mapStateToProps,
  { create, fetchSome, heartbeat }
)(CharacterCreate);
