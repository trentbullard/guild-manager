/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const renderItemList = slots => {
  return slots.map(s => {
    if (
      s.name == "ammo" ||
      s.name == "food" ||
      s.name == "drink" ||
      s.name == "mount_adornment" ||
      s.name == "mount_armor" ||
      s.name == "activate1" ||
      s.name == "activate2"
    ) {
      return;
    }

    if (!s.item) {
      return (
        <tr key={s.id}>
          <td data-label={`${s.name}-label`}>{s.name}</td>
          <td data-label={`${s.name}-primary`} />
          <td data-label={`${s.name}-stamina`} />
          <td data-label={`${s.name}-mit`} />
          <td data-label={`${s.name}-off`} />
          <td data-label={`${s.name}-def`} />
          <td data-label={`${s.name}-spell`} />
          <td data-label={`${s.name}-pot`} />
          <td data-label={`${s.name}-crit-c`} />
          <td data-label={`${s.name}-haste`} />
          <td data-label={`${s.name}-ab-mod`} />
          <td data-label={`${s.name}-cst-spd`} />
        </tr>
      );
    }

    const strength = s.item.modifiers.strength
      ? s.item.modifiers.strength.value
      : 0;
    const stamina = s.item.modifiers.stamina
      ? s.item.modifiers.stamina.value
      : 0;
    const offensive = s.item.modifiers.offensiveskills
      ? s.item.modifiers.offensiveskills.value
      : 0;
    const defensive = s.item.modifiers.defensiveskills
      ? s.item.modifiers.defensiveskills.value
      : 0;
    const spell = s.item.modifiers.spellskills
      ? s.item.modifiers.spellskills.value
      : 0;
    const pot = s.item.modifiers.basemodifier
      ? s.item.modifiers.basemodifier.value
      : 0;
    const critChance = s.item.modifiers.critchance
      ? s.item.modifiers.critchance.value
      : 0;
    const haste = s.item.modifiers.attackspeed
      ? s.item.modifiers.attackspeed.value
      : 0;
    const abMod = s.item.modifiers.all ? s.item.modifiers.all.value : 0;
    const castSpeed = s.item.modifiers.spelltimecastpct
      ? s.item.modifiers.spelltimecastpct.value
      : 0;

    return (
      <tr key={s.id}>
        <td data-label={`${s.name}-label`}>{s.name}</td>
        <td data-label={`${s.name}-primary`}>{strength}</td>
        <td data-label={`${s.name}-stamina`}>{stamina}</td>
        <td data-label={`${s.name}-mit`}>
          {s.item.typeinfo.maxarmorclass || 0}
        </td>
        <td data-label={`${s.name}-off`}>{offensive}</td>
        <td data-label={`${s.name}-def`}>{defensive}</td>
        <td data-label={`${s.name}-spell`}>{spell}</td>
        <td data-label={`${s.name}-pot`}>{pot}</td>
        <td data-label={`${s.name}-crit-c`}>{critChance}</td>
        <td data-label={`${s.name}-haste`}>{haste}</td>
        <td data-label={`${s.name}-ab-mod`}>{abMod}</td>
        <td data-label={`${s.name}-cst-spd`}>{castSpeed}</td>
      </tr>
    );
  });
};

const ItemsTab = ({ character, refresh }) => {
  const slots = character.equipmentslot_list;

  return (
    <div>
      <h3 className="ui header">
        Equipped Gear
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
      <div className="ui sixeteen column vertically padded grid">
        <div className="ui sixteen wide column">
          <table className="ui center aligned collapsing definition celled compact small striped table">
            <thead>
              <tr>
                <th />
                <th>main attribute</th>
                <th>stamina</th>
                <th>mitigation</th>
                <th>off</th>
                <th>def</th>
                <th>spell</th>
                <th>pot</th>
                <th>crit c</th>
                <th>haste</th>
                <th>ab mod</th>
                <th>cst spd</th>
              </tr>
            </thead>
            <tbody>{renderItemList(slots)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsTab;
