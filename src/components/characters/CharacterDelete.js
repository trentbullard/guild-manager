import React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { fetchSome, destroy, heartbeat } from "../../actions";

class CharacterDelete extends React.Component {
  constructor(props) {
    super(props);
    this.paramId = 0;
    this.doFetchUserCharacters = true;
    this.doDeleteUserCharacter = true;
  }

  checkAuthorization = () => {
    if (this.props.currentUser && this.doFetchUserCharacters) {
      this.doFetchUserCharacters = false;
      this.props.fetchSome(
        "user_character",
        `user:${this.props.currentUser.id}`,
        true
      );
    }
  };

  deleteUserCharacter = () => {
    this.paramId = this.props.match.params.id;
    if (
      this.paramId in this.props.userCharacters &&
      this.doDeleteUserCharacter
    ) {
      this.doDeleteUserCharacter = false;
      const userCharacterToDelete = this.props.userCharacters[this.paramId];
      this.props.destroy(
        "user_character",
        `${this.props.currentUser.id}_${this.paramId}`,
        userCharacterToDelete,
        true
      );
    }
  };

  componentDidMount() {
    this.checkAuthorization();
    this.deleteUserCharacter();
  }

  componentDidUpdate() {
    this.checkAuthorization();
    this.deleteUserCharacter();
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    userCharacters: state.userCharacters,
    currentUser: state.currentUser
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    { fetchSome, destroy, heartbeat }
  )(CharacterDelete)
);
