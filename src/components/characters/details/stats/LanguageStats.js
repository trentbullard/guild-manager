import _ from "lodash";
import React from "react";

const renderLanguageList = languages => {
  return languages.map(l => {
    return (
      <tr key={l.id}>
        <td data-label={l.id}>{l.name}</td>
      </tr>
    );
  });
};

const LanguageStats = ({ languages }) => {
  return (
    <div className="ui three wide column">
      <div className="row">
        <div className="ui column">
          <h4>Languages</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing celled table">
              <tbody>
                {renderLanguageList(_.orderBy(languages, "name", "asc"))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageStats;
