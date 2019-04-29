import React from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import "react-table/react-table.css";

const MemberTable = ({ members }) => {
  const data = members.map(m => {
    return {
      name: m.name.first,
      level: m.type.level,
      class: m.type.class,
      stamina: m.stats.sta.effective,
      ehp: m.stats.health.max,
      power: m.stats.power.max
    };
  });
  const columns = Object.keys(data[0]).map(key => {
    if (key == "name") {
      return { Header: key, accessor: key };
    }
    return { Header: key, accessor: key };
  });
  return <ReactTable data={data} columns={columns} />;
};

export default MemberTable;
