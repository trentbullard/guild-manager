import React from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions";

class ItemShow extends React.Component {
  render() {
    return <div>ItemShow</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.items[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchOne }
)(ItemShow);
