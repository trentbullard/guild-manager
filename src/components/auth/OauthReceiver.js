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
    console.log("props: ", props);
    this.codeErrors = null;
  }

  getQueryParams() {
    console.log("this.props: ", this.props);
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
    this.props.create("user", newUser);
  }

  checkState() {
    if (this.props.session && this.props.session.userId) {
      return;
    }

    if (this.props.currentUser && this.props.currentUser.id) {
      const { cookies } = this.props;
      cookies.set(
        "eq2-data-session",
        { userId: this.props.currentUser.id },
        {
          path: "/",
          expires: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      );
      return;
    }

    if (this.props.discordUserMatch && this.props.discordUserMatch.id) {
      this.props.fetchAuthUser(this.props.discordUserMatch.id);
      return;
    }

    if (this.props.discordProfileData && this.props.discordProfileData.id) {
      if (
        this.props.discordUserMatch &&
        this.props.discordUserMatch.length > 0
      ) {
        this.createNewUserFromDiscordData(
          this.props.discordProfileData,
          this.props.tokenResponse
        );
        return;
      }
      this.props.handleDiscordData(this.props.discordProfileData.id);
      return;
    }

    if (this.props.tokenResponse) {
      if (this.props.tokenResponse.access_token) {
        this.props.handleAccessToken(this.props.tokenResponse.access_token);
        return;
      } else {
        this.codeErrors = this.props.tokenResponse;
        this.props.signOut();
        return;
      }
    }

    const code = this.getQueryParams().code;
    if (code) {
      this.props.handleAuthCode(code);
      return;
    }
  }

  componentDidMount() {
    this.checkState();
  }

  componentDidUpdate() {
    this.checkState();
  }

  renderRedirect = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
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
    currentUser: state.auth.currentUser,
    tokenResponse: state.auth.tokenResponse,
    discordProfileData: state.auth.discordProfileData,
    discordUserMatch: state.auth.discordUserMatch
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
