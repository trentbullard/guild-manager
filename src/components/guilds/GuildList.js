// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const renderList = (currentUser, guilds) => {
  if (!guilds || Object.keys(guilds).length < 1) {
    return <div>None Found</div>;
  }
  return Object.values(guilds).map(guild => {
    var description = "";
    if (guild.personalitytag_list) {
      const tags = guild.personalitytag_list || [];
      const iTag = Math.floor(Math.random() * Math.floor(tags.length));
      description = guild.personalitytag_list[iTag].text;
    }
    return (
      <div className="item" key={guild.guildid}>
        {/* {renderAdmin(currentUser, guild)} */}
        <i className="large middle aligned icon building outline" />
        <div className="content">
          <Link to={`/guilds/${guild.name}`} className="header">
            {guild.name}
          </Link>
          <div className="description">{description}</div>
        </div>
      </div>
    );
  });
};

const renderListHeader = currentUser => {
  if (currentUser) {
    return "Guilds";
  } else {
    return "Guilds";
  }
};

const GuildList = props => {
  return (
    <div>
      <h3 className="ui header">
        {renderListHeader(props.currentUser)}
        {/* {renderCreate()} */}
      </h3>
      <div className="ui celled list">
        {renderList(props.currentUser, props.guilds)}
      </div>
    </div>
  );
};

export default GuildList;
