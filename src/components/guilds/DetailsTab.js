import React from "react";
import { format } from "../../helpers/dates";
import MemberCount from "./details/MemberCount";
import RankList from "./details/RankList";
import PersonalityTagList from "./details/PersonalityTagList";

const DetailsTab = ({ guild }) => {
  const dateFormed = new Date(guild.dateformed * 1000);
  return (
    <div>
      <div className="ui sixteen column grid">
        <div className="ui row">
          <div className="ui sixteen wide column">
            <div>
              <b>Date Formed:</b> {format(dateFormed, "MMMM DD, YYYY")}
            </div>
            <br />
            <div>
              <b>Recruiting Message:</b> {guild.recruiting.shorttext}
              <br />
              {guild.recruiting.longtext}
            </div>
            <br />
            <div>
              <PersonalityTagList tags={guild.personalitytag_list} />
            </div>
          </div>
        </div>
        <div className="ui row">
          <MemberCount accounts={guild.accounts} members={guild.members} />
          <RankList ranks={guild.rank_list} />
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
