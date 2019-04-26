import _ from "lodash";
import React from "react";

const renderFactionList = factions => {
  return factions.map(f => {
    return (
      <tr key={f.id}>
        <td data-label="faction-name">{f.name}</td>
        <td data-label="faction-value">{f.value}</td>
      </tr>
    );
  });
};

const FactionStats = ({ factions }) => {
  const filteredFactions = factions.map(f => {
    var shortName = f.name.split("The ")[1] || f.name;
    shortName = shortName.split("City of ")[1] || shortName;
    return { name: shortName, value: f.value, id: f.id };
  });
  return (
    <div className="ui five wide column">
      <div className="row">
        <div className="ui column">
          <h4>Factions</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing definition table">
              <tbody>
                {renderFactionList(_.orderBy(filteredFactions, "name", "asc"))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactionStats;
