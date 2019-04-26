import React from "react";

const LocationStats = ({ locationdata }) => {
  return (
    <div className="ui eight wide column">
      <div className="row">
        <div className="ui column">
          <h4>Location</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixeteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing definition table">
              <tbody>
                <tr>
                  <td>current zone</td>
                  <td data-label="current-zone">{locationdata.zonename}</td>
                </tr>
                <tr>
                  <td>coords</td>
                  <td data-label="coords">{locationdata.coords}</td>
                </tr>
                <tr>
                  <td>bind zone</td>
                  <td data-label="bind-zone">{locationdata.bindzone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStats;
