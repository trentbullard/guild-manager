/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import VitalStats from "./details/stats/VitalStats";
import ResistStats from "./details/stats/ResistStats";
import ActivityStats from "./details/stats/ActivityStats";
import LanguageStats from "./details/stats/LanguageStats";
import LocationStats from "./details/stats/LocationStats";
import ExperienceStats from "./details/stats/ExperienceStats";
import FactionStats from "./details/stats/FactionStats";

const StatsTab = ({ character, refresh }) => {
  return (
    <div>
      <h3 className="ui header">
        {`Level ${character.type.level} ${character.type.race} ${
          character.type.class
        } on ${character.locationdata.world}`}
        <div className="ui sub header">
          {`updated: ${new Date(character.updated_at).toLocaleString()} `}
          <a
            onClick={refresh}
            data-inverted=""
            data-tooltip="usable every 15 minutes"
            data-position="right center"
          >
            <i className="sync alternate icon" />
          </a>
        </div>
      </h3>
      <div className="ui hidden divider" />
      <div className="ui sixteen column grid">
        <VitalStats stats={character.stats} />
        <ResistStats resists={character.resists} />
        <div className="ui sixteen wide centered column divider" />
        <LanguageStats languages={character.language_list} />
        <ActivityStats stats={character.statistics} />
        <LocationStats locationdata={character.locationdata} />
        <ExperienceStats stats={character.experience} />
        <FactionStats factions={character.faction_list} />
        <div className="ui hidden divider" />
      </div>
    </div>
  );
};

export default StatsTab;
