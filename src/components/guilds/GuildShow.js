import React from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions";

class GuildShow extends React.Component {
  render() {
    return <div>GuildShow</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    guild: state.guilds[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchOne }
)(GuildShow);
