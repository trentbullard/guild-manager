import React from "react";
import { Link } from "react-router-dom";
import DiscordAuth from "./auth/DiscordAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to={`/`} className="item">
        Raid Dashboard
      </Link>
      <div className="right menu">
        <DiscordAuth />
      </div>
    </div>
  );
};

export default Header;
