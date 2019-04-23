import React from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions";

class CharacterShow extends React.Component {
  render() {
    console.log("char show session prop: ", this.props.session);
    return <div>CharacterShow</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    character: state.characters[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchOne }
)(CharacterShow);
