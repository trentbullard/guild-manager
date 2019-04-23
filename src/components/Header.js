import React from "react";
import { Link } from "react-router-dom";
import DiscordAuth from "./auth/DiscordAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to={`/`} className="item">
        Convergence
      </Link>
      <div className="right menu">
        <DiscordAuth />
      </div>
    </div>
  );
};

export default Header;
