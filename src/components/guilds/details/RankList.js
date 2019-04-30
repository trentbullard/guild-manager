import _ from "lodash";
import React from "react";

const renderRankList = ranks => {
  return ranks.map(r => {
    return (
      <tr key={r.id}>
        <td data-label={r.name}>{r.name}</td>
      </tr>
    );
  });
};

const RankList = ({ ranks }) => {
  return (
    <div className="ui four wide column">
      <div className="ui row">
        <div className="ui column">
          <h4>Rank List</h4>
        </div>
      </div>
      <div className="ui row">
        <div className="ui sixteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing striped celled table">
              <tbody>{renderRankList(_.sortBy(ranks, "id"))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankList;
