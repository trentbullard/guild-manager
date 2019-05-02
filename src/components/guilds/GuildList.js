import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSome } from "../../actions";

const onClickLeave = () => {};

const renderAdmin = (currentUser, guild) => {
  if (currentUser) {
    return (
      <div className="right floated content">
        <button onClick={onClickLeave} className="button ui negative">
          Leave
        </button>
      </div>
    );
  }
};

const renderList = (currentUser, guilds) => {
  return Object.values(guilds).map(guild => {
    var description = "";
    if (guild.personalitytag_list) {
      const tags = guild.personalitytag_list || [];
      const iTag = Math.floor(Math.random() * Math.floor(tags.length));
      description = guild.personalitytag_list[iTag].text;
    }
    return (
      <div className="item" key={guild.id}>
        {/* {renderAdmin(currentUser, guild)} */}
        <i className="large middle aligned icon building outline" />
        <div className="content">
          <Link to={`/guilds/${guild.id}`} className="header">
            {guild.name}
          </Link>
          <div className="description">{description}</div>
        </div>
      </div>
    );
  });
};

const renderCreate = currentUser => {
  if (currentUser) {
    return (
      <Link to="/events/new" className="ui green label">
        <i className="plus icon" /> New
      </Link>
    );
  }
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
