import React from "react";

const renderPersonalityTagList = tags => {
  return tags.map(t => {
    return <li key={t.text.split(" ").join("-")}>{t.text}</li>;
  });
};

const PersonalityTagList = ({ tags }) => {
  return (
    <div className="ui four wide column">
      <div className="ui row">
        <div className="ui column">
          <b>Guild Personality Tags:</b>
          <br />
          <ul>{renderPersonalityTagList(tags)}</ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTagList;
