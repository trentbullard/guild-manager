import React from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions";

class EventShow extends React.Component {
  render() {
    return <div>EventShow</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchOne }
)(EventShow);
