import React from "react";

const VitalStats = ({ stats }) => {
  return (
    <div className="ui sixteen wide column">
      <div className="row">
        <div className="ui column">
          <h4>Vital</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui five wide column">
            <table className="ui center aligned definition table">
              <thead>
                <tr>
                  <th />
                  <th>max</th>
                  <th>regen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>health</td>
                  <td data-label="health-max">{stats.health.max}</td>
                  <td data-label="health-regen">{stats.health.regen}</td>
                </tr>
                <tr>
                  <td>power</td>
                  <td data-label="power-max">{stats.power.max}</td>
                  <td data-label="power-regen">{stats.power.regen}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column" />
          <div className="ten wide column">
            <table className="ui center aligned celled table">
              <thead>
                <tr>
                  <th>stamina</th>
                  <th>strength</th>
                  <th>agility</th>
                  <th>intelligence</th>
                  <th>wisdom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="stamina">{stats.sta.effective}</td>
                  <td data-label="strength">{stats.str.effective}</td>
                  <td data-label="agility">{stats.agi.effective}</td>
                  <td data-label="intelligence">{stats.int.effective}</td>
                  <td data-label="wisdom">{stats.wis.effective}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalStats;
