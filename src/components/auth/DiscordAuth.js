import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { signOut } from "../../actions";

class DiscordAuth extends React.Component {
  renderAuthButton() {
    if (this.props.currentUser) {
      return (
        <Link to="/logout" className="ui negative discord button">
          <i className="discord icon" /> Logout
        </Link>
      );
    } else {
      const clientId = `client_id=${
        process.env.REACT_APP_DISCORD_OAUTH_CLIENT_ID
      }`;
      const redirect_uri = `redirect_uri=${encodeURIComponent(
        process.env.REACT_APP_ROOT_URI
      )}%2Foauth%2Ftoken`;
      const response_type = `response_type=code`;
      const scope = `scope=${encodeURIComponent("identify email")}`;
      return (
        <a
          href={`https://discordapp.com/api/oauth2/authorize?${clientId}&${redirect_uri}&${response_type}&${scope}`}
          className="ui primary discord button"
        >
          <i className="discord icon" />
          Sign In with Discord
        </a>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="item">{this.renderAuthButton()}</div>
      </div>
    );
  }
}

const getSessionCookie = props => {
  const { cookies } = props;
  return cookies.get("eq2-data-session");
};

const mapStateToProps = (state, ownProps) => {
  return {
    session: getSessionCookie(ownProps),
    currentUser: state.currentUser
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    { signOut }
  )(DiscordAuth)
);
