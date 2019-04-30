import React from "react";

const MemberCount = ({ accounts, members }) => {
  return (
    <div className="ui four wide column">
      <div className="ui row">
        <div className="ui column">
          <h4>Member Count</h4>
        </div>
      </div>
      <div className="ui row">
        <div className="ui sixteen column vertically padded grid">
          <div className="ui sixteen wide column">
            <table className="ui center aligned collapsing definition table">
              <tbody>
                <tr>
                  <td>Accounts</td>
                  <td data-label="accounts">{accounts}</td>
                </tr>
                <tr>
                  <td>Members</td>
                  <td data-label="members">{members}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCount;
