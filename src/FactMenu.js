import React from "react";
import range from 'lodash/range';

function FactMenu() {
  return (
    <div className="menu">
      <ul className="menu-list">
        {range(9).map(n => <li>{n}s and {n+1}s</li>)}
        <li>Mixed Facts</li>
      </ul>
    </div>
  );
}

export default FactMenu;
