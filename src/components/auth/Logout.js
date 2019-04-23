import React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../actions";

class Logout extends React.Component {
  componentDidMount() {
    this.props.signOut();
  }

  renderRedirect = () => {
    if (this.props.session) {
      const { cookies } = this.props;
      cookies.remove("eq2-data-session");
    }
    if (this.props.currentUser) {
      this.props.signOut();
      return "Working...";
    }
    return <Redirect to="/" />;
  };

  render() {
    return <div>{this.renderRedirect()}</div>;
  }
}

const getSessionCookie = props => {
  const { cookies } = props;
  return cookies.get("eq2-data-session");
};

const mapStateToProps = (state, ownProps) => {
  return {
    session: getSessionCookie(ownProps),
    currentUser: state.auth.currentUser
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    { signOut }
  )(Logout)
);
