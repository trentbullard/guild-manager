import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { instanceOf } from "prop-types";
import { Cookies, withCookies } from "react-cookie";
import { connect } from "react-redux";
import Alert from "./Alert";
import Header from "./Header";
import Dashboard from "./Dashboard";
import CharacterShow from "./characters/CharacterShow";
import CharacterCreate from "./characters/CharacterCreate";
import GuildShow from "./guilds/GuildShow";
import EventShow from "./events/EventShow";
import ItemShow from "./items/ItemShow";
import OauthReceiver from "./auth/OauthReceiver";
import DataSynthesizer from "./DataSynthesizer";
import CharacterDelete from "./characters/CharacterDelete";
import Logout from "./auth/Logout";
import history from "../history";
import { fetchAuthUser } from "../actions";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    if (this.props.currentUser) {
      return;
    }
    if (this.props.session && this.props.session.userId) {
      this.props.fetchAuthUser(this.props.session.userId);
    }
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <DataSynthesizer />
            <Header />
            <Alert />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/characters/new" exact component={CharacterCreate} />
              <Route
                path="/characters/delete/:id"
                exact
                component={CharacterDelete}
              />
              <Route path="/characters/:id" exact component={CharacterShow} />
              <Route path="/guilds/:id" exact component={GuildShow} />
              <Route path="/events/:id" exact component={EventShow} />
              <Route path="/items/:id" exact component={ItemShow} />
              <Route path="/oauth/token" exact component={OauthReceiver} />
              <Route path="/logout" exact component={Logout} />
            </Switch>
          </div>
        </Router>
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
    currentUser: state.currentUser,
    session: getSessionCookie(ownProps)
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    { fetchAuthUser }
  )(App)
);
