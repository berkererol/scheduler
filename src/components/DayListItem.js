import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";



export default function DayListItem(props) {
  const formatSpots = function () {
    if (!props.spots) {
      return "no spots remaining"
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`
    } else return `${props.spots} spots remaining`
  };


  const dayClass = classnames("day-list__item", {
    "day-list__item--selected ": props.selected,
    "day-list__item--full": !props.spots,
  });


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
