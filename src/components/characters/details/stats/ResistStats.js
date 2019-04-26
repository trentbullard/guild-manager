import React from "react";

const ResistStats = ({ resists }) => {
  return (
    <div className="ui sixteen wide column">
      <div className="row">
        <div className="ui column">
          <h4>Resists</h4>
        </div>
      </div>
      <div className="row">
        <div className="ui sixteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned celled table">
              <thead>
                <tr>
                  <th>noxious</th>
                  <th>arcane</th>
                  <th>elemental</th>
                  <th>physical</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="noxious">{resists.noxious.effective}</td>
                  <td data-label="arcane">{resists.arcane.effective}</td>
                  <td data-label="elemental">{resists.elemental.effective}</td>
                  <td data-label="physical">{resists.physical.effective}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResistStats;
