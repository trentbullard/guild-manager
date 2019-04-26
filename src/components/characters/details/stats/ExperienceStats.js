import React from "react";

const ExperienceStats = ({ stats }) => {
  return (
    <div className="ui six wide column">
      <div className="row">
        <div className="uicolumn">
          <h4>Experience</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing definition table">
              <tbody>
                <tr>
                  <td> adventure xp needed for next level</td>
                  <td data-label="xp-needed-for-next-level">
                    {stats.adventureexpfornextlevel}
                  </td>
                </tr>
                <tr>
                  <td>current adventure xp</td>
                  <td data-label="current-adventure-xp">
                    {stats.currentadventureexp}
                  </td>
                </tr>
                <tr>
                  <td> tradeskill xp needed for next level</td>
                  <td data-label="xp-needed-for-next-level">
                    {stats.tradeskillexpfornextlevel}
                  </td>
                </tr>
                <tr>
                  <td>current tradeskill xp</td>
                  <td data-label="current-tradeskill-xp">
                    {stats.currenttradeskillexp}
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

export default ExperienceStats;
