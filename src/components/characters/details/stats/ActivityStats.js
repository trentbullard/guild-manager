import React from "react";

const ActivityStats = ({ stats }) => {
  return (
    <div className="ui five wide column">
      <div className="row">
        <div className="ui column">
          <h4>Activity</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing definition table">
              <tbody>
                <tr>
                  <td>kills</td>
                  <td data-label="kills">{stats.kills.value}</td>
                </tr>
                <tr>
                  <td>deaths</td>
                  <td data-label="deaths">{stats.deaths.value}</td>
                </tr>
                <tr>
                  <td>highest melee hit</td>
                  <td data-label="max_melee_hit">
                    {stats.max_melee_hit.value}
                  </td>
                </tr>
                <tr>
                  <td>highest magic hit</td>
                  <td data-label="max_magic_hit">
                    {stats.max_magic_hit.value}
                  </td>
                </tr>
                <tr>
                  <td>items crafted</td>
                  <td data-label="items_crafted">
                    {stats.items_crafted.value}
                  </td>
                </tr>
                <tr>
                  <td>rares harvested</td>
                  <td data-label="rare_harvests">
                    {stats.rare_harvests.value}
                  </td>
                </tr>
                <tr>
                  <td>kdr</td>
                  <td data-label="kills_deaths_ratio">
                    {stats.kills_deaths_ratio.value.toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
