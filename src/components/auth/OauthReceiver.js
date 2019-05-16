import React from "react";
import { Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { connect } from "react-redux";
import queryString from "query-string";
import {
  fetchAuthUser,
  handleAuthCode,
  handleAccessToken,
  handleDiscordData,
  create,
  signOut
} from "../../actions";

var util = require("util");

class OauthReceiver extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.codeErrors = null;
    this.doFetchAuthUser = true;
    this.doFetchWithDiscordData = true;
  }

  getQueryParams() {
    return queryString.parse(this.props.location.search);
  }

  createNewUserFromDiscordData(profileData, tokenData) {
    const newUser = {
      id: profileData.id,
      discord_id: profileData.id,
      email: profileData.email,
      discord_username: profileData.username,
      discord_discriminator: profileData.discriminator,
      discord_avatar: profileData.avatar,
      discord_access_token: tokenData.access_token,
      discord_refresh_token: tokenData.refresh_token
    };
    this.props.create("user", profileData.id, newUser, true);
  }

  sessionExists = () => {
    if (this.props.session && this.props.session.userId) {
      return true;
    }
    return false;
  };

  setSession = () => {
    const { cookies } = this.props;
    cookies.set(
      "eq2-data-session",
      { userId: this.props.currentUser.id },
      {
        path: "/",
        expires: new Date(new Date().setMonth(new Date().getMonth() + 1))
      }
    );
  };

  checkState() {
    if (this.sessionExists()) {
    } else if (this.props.currentUser) {
      this.setSession();
    } else if (this.props.discordUserMatch && this.props.discordUserMatch.id) {
      if (this.doFetchAuthUser) {
        this.doFetchAuthUser = false;
        this.props.fetchAuthUser(this.props.discordUserMatch.id);
      }
    } else if (this.props.discordProfileData) {
      if (this.doFetchWithDiscordData) {
        this.doFetchWithDiscordData = false;
        this.props.handleDiscordData(this.props.discordProfileData.id);
      } else {
        this.createNewUserFromDiscordData(
          this.props.discordProfileData,
          this.props.tokenResponse
        );
      }
    } else if (this.props.tokenResponse) {
      if (this.props.tokenResponse.access_token) {
        this.props.handleAccessToken(this.props.tokenResponse.access_token);
      } else {
        this.codeErrors = this.props.tokenResponse;
        this.props.signOut();
      }
    } else {
      const code = this.getQueryParams().code;
      if (code) {
        this.props.handleAuthCode(code);
      }
    }
  }

  componentDidMount() {
    this.checkState();
  }

  componentDidUpdate() {
    this.checkState();
  }

  renderRedirect = () => {
    if (this.props.currentUser) {
      console.log("already logged in");
      return <Redirect to="/" />;
    }
    if (!this.getQueryParams().code) {
      console.log("no authorization code in params");
      return <Redirect to="/" />;
    }
    if (this.codeErrors) {
      console.log(
        "error exchanging authorization code for access token: ",
        util.inspect(this.codeErrors)
      );
      return <Redirect to="/" />;
    }
    return "Working...";
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
    currentUser: state.currentUser,
    tokenResponse: state.tokenResponse,
    discordProfileData: state.discordProfile,
    discordUserMatch: state.discordUserMatch
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    {
      fetchAuthUser,
      handleAuthCode,
      handleAccessToken,
      handleDiscordData,
      create,
      signOut
    }
  )(OauthReceiver)
);
